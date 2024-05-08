import type { ExecSyncOptions } from 'child_process'

import chalk from 'chalk'
import { loadChangelogConfig } from 'changelogen'
import { execSync } from 'child_process'
import execa from 'execa'
import fse from 'fs-extra'
import minimist from 'minimist'
import { fileURLToPath } from 'node:url'
import pLimit from 'p-limit'
import path from 'path'
import prompts from 'prompts'
import semver from 'semver'

import type { PackageDetails } from './lib/getPackageDetails.js'

import { getPackageDetails } from './lib/getPackageDetails.js'
import { getPackageRegistryVersions } from './lib/getPackageRegistryVersions.js'
import { packageWhitelist } from './lib/whitelist.js'
import { getRecommendedBump } from './utils/getRecommendedBump.js'
import { updateChangelog } from './utils/updateChangelog.js'

const npmPublishLimit = pLimit(6)

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const cwd = path.resolve(dirname, '..')

const execOpts: ExecSyncOptions = { stdio: 'inherit' }
const execaOpts: execa.Options = { stdio: 'inherit' }

const args = minimist(process.argv.slice(2))

const {
  bump = 'patch', // Semver release type
  changelog = false, // Whether to update the changelog. WARNING: This gets throttled on too many commits
  'dry-run': dryRun,
  'git-tag': gitTag = true, // Whether to run git tag and commit operations
  'git-commit': gitCommit = true, // Whether to run git commit operations
  tag = 'latest',
} = args

const logPrefix = dryRun ? chalk.bold.magenta('[dry-run] >') : ''

const cmdRunner =
  (dryRun: boolean, gitTag: boolean) => (cmd: string, execOpts: ExecSyncOptions) => {
    const isGitCommand = cmd.startsWith('git')
    if (dryRun || (isGitCommand && !gitTag)) {
      console.log(logPrefix, cmd)
    } else {
      execSync(cmd, execOpts)
    }
  }

const cmdRunnerAsync =
  (dryRun: boolean) => async (cmd: string, args: string[], options?: execa.Options) => {
    if (dryRun) {
      console.log(logPrefix, cmd, args.join(' '))
      return { exitCode: 0 }
    } else {
      return await execa(cmd, args, options ?? { stdio: 'inherit' })
    }
  }

async function main() {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN env var is required')
  }

  if (dryRun) {
    console.log(chalk.bold.yellow(chalk.bold.magenta('\n  👀 Dry run mode enabled')))
  }

  console.log({ args })

  const fromVersion = execSync('git describe --tags --abbrev=0').toString().trim()

  const config = await loadChangelogConfig(process.cwd(), {
    repo: 'payloadcms/payload',
  })

  if (!semver.RELEASE_TYPES.includes(bump)) {
    abort(`Invalid bump type: ${bump}.\n\nMust be one of: ${semver.RELEASE_TYPES.join(', ')}`)
  }

  const recommendedBump = (await getRecommendedBump(fromVersion, 'HEAD', config)) || 'patch'

  if (bump !== recommendedBump) {
    console.log(
      chalk.bold.yellow(
        `Recommended bump type is '${recommendedBump}' based on commits since last release`,
      ),
    )
    const confirmBump = await confirm(`Do you want to continue with bump: '${bump}'?`)
    if (!confirmBump) {
      abort()
    }
  }

  const runCmd = cmdRunner(dryRun, gitTag)
  const runCmdAsync = cmdRunnerAsync(dryRun)

  if (bump.startsWith('pre') && tag === 'latest') {
    abort(`Prerelease bumps must have tag: beta or canary`)
  }

  const monorepoVersion = fse.readJSONSync('package.json')?.version

  if (!monorepoVersion) {
    throw new Error('Could not find version in package.json')
  }

  // TODO: Re-enable this check once we start tagging releases again
  // if (monorepoVersion !== lastTag.replace('v', '')) {
  //   throw new Error(
  //     `Version in package.json (${monorepoVersion}) does not match last tag (${lastTag})`,
  //   )
  // }

  const nextReleaseVersion = semver.inc(monorepoVersion, bump, undefined, tag)

  if (!nextReleaseVersion) {
    abort(`Invalid nextReleaseVersion: ${nextReleaseVersion}`)
    return // For TS type checking
  }

  // Preview/Update changelog
  header(`${logPrefix}📝 Updating changelog...`)
  const {
    changelog: changelogContent,
    releaseNotes,
    releaseUrl,
  } = await updateChangelog({
    bump,
    dryRun,
    toVersion: 'HEAD',
    fromVersion,
    openReleaseUrl: true,
    writeChangelog: changelog,
  })

  console.log(chalk.green('\nChangelog Preview:\n'))
  console.log(chalk.gray(changelogContent) + '\n\n')
  console.log(`Release URL: ${chalk.dim(releaseUrl)}`)

  let packageDetails = await getPackageDetails(packageWhitelist)

  console.log(chalk.bold(`\n  Version: ${monorepoVersion} => ${chalk.green(nextReleaseVersion)}\n`))
  console.log(chalk.bold.yellow(`  Bump: ${bump}`))
  console.log(chalk.bold.yellow(`  Tag: ${tag}\n`))
  console.log(chalk.bold.green(`  Changes (${packageDetails.length} packages):\n`))
  console.log(
    `${packageDetails.map((p) => `  - ${p.name.padEnd(32)} ${p.version} => ${chalk.green(nextReleaseVersion)}`).join('\n')}\n`,
  )

  const confirmPublish = await confirm('Are you sure you want to create these versions?')

  if (!confirmPublish) {
    abort()
  }

  // Prebuild all packages
  header(`\n🔨 Prebuilding all packages...`)

  await execa('pnpm', ['install'], execaOpts)

  const buildResult = await execa('pnpm', ['build:all', '--output-logs=errors-only'], execaOpts)
  if (buildResult.exitCode !== 0) {
    console.error(chalk.bold.red('Build failed'))
    console.log(buildResult.stderr)
    abort('Build failed')
  }

  // Increment all package versions
  header(`${logPrefix}📦 Updating package.json versions...`)
  await Promise.all(
    packageDetails.map(async (pkg) => {
      const packageJson = await fse.readJSON(`${pkg.packagePath}/package.json`)
      packageJson.version = nextReleaseVersion
      if (!dryRun) {
        await fse.writeJSON(`${pkg.packagePath}/package.json`, packageJson, { spaces: 2 })
      }
    }),
  )

  // Set version in root package.json
  header(`${logPrefix}📦 Updating root package.json...`)
  const rootPackageJsonPath = path.resolve(dirname, '../package.json')
  const rootPackageJson = await fse.readJSON(rootPackageJsonPath)
  rootPackageJson.version = nextReleaseVersion
  if (!dryRun) {
    await fse.writeJSON(rootPackageJsonPath, rootPackageJson, { spaces: 2 })
  }

  // Commit
  header(`🧑‍💻 Committing changes...`)

  // Commit all staged changes
  runCmd(`git add CHANGELOG.md packages/**/package.json package.json`, execOpts)

  // Wait 500ms to avoid .git/index.lock errors
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (gitCommit) {
    runCmd(`git commit -m "chore(release): v${nextReleaseVersion} [skip ci]"`, execOpts)
  }

  // Tag
  header(`🏷️  Tagging release v${nextReleaseVersion}`, { enable: gitTag })
  runCmd(`git tag -a v${nextReleaseVersion} -m "v${nextReleaseVersion}"`, execOpts)

  // Publish only payload to get 5 min auth token
  packageDetails = packageDetails.filter((p) => p.name !== 'payload')
  runCmd(`pnpm publish -C packages/payload --no-git-checks --json --tag ${tag}`, execOpts)

  const results = await Promise.allSettled(
    packageDetails.map((pkg) => publishPackageThrottled(pkg, { dryRun })),
  )

  console.log(chalk.bold.green(`\n\nResults:\n`))

  // New results format
  console.log(
    results
      .map((result) => {
        if (result.status === 'rejected') {
          console.error(result.reason)
          return `  ❌ ${String(result.reason)}`
        }
        const { name, success, details } = result.value
        let summary = `  ${success ? '✅' : '❌'} ${name}`
        if (details) {
          summary += `\n    ${details}\n`
        }
        return summary
      })
      .join('\n') + '\n',
  )

  // TODO: Push commit and tag
  // const push = await confirm(`Push commits and tags?`)
  // if (push) {
  //   header(`Pushing commits and tags...`)
  //   execSync(`git push --follow-tags`, execOpts)
  // }

  header('🎉 Done!')

  console.log(chalk.bold.green(`\n\nRelease URL: ${releaseUrl}`))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

/** Publish with promise concurrency throttling */
async function publishPackageThrottled(pkg: PackageDetails, opts?: { dryRun?: boolean }) {
  const { dryRun = false } = opts ?? {}
  return npmPublishLimit(() => publishSinglePackage(pkg, { dryRun }))
}

async function publishSinglePackage(pkg: PackageDetails, opts?: { dryRun?: boolean }) {
  const { dryRun = false } = opts ?? {}
  console.log(chalk.bold(`🚀 ${pkg.name} publishing...`))

  try {
    const cmdArgs = ['publish', '-C', pkg.packagePath, '--no-git-checks', '--json', '--tag', tag]
    if (dryRun) {
      cmdArgs.push('--dry-run')
    }
    const { exitCode, stderr } = await execa('pnpm', cmdArgs, {
      cwd,
      stdio: ['ignore', 'ignore', 'pipe'],
      // stdio: 'inherit',
    })

    if (exitCode !== 0) {
      console.log(chalk.bold.red(`\n\n❌ ${pkg.name} ERROR: pnpm publish failed\n\n${stderr}`))

      // Retry publish
      console.log(chalk.bold.yellow(`\nRetrying publish for ${pkg.name}...`))
      const { exitCode: retryExitCode, stderr: retryStdError } = await execa('pnpm', cmdArgs, {
        cwd,
        stdio: 'inherit', // log full output
      })

      if (retryExitCode !== 0) {
        console.error(
          chalk.bold.red(
            `\n\n❌ ${pkg.name} ERROR: pnpm publish failed on retry\n\n${retryStdError}`,
          ),
        )
      }

      return {
        name: pkg.name,
        success: false,
        details: `Exit Code: ${retryExitCode}, stderr: ${retryStdError}`,
      }
    }

    console.log(`${logPrefix} ${chalk.green(`✅ ${pkg.name} published`)}`)
    return { name: pkg.name, success: true }
  } catch (err: unknown) {
    console.error(err)
    return {
      name: pkg.name,
      success: false,
      details:
        err instanceof Error
          ? `Error publishing ${pkg.name}: ${err.message}`
          : `Unexpected error publishing ${pkg.name}: ${String(err)}`,
    }
  }
}

function abort(message = 'Abort', exitCode = 1) {
  console.error(chalk.bold.red(`\n${message}\n`))
  process.exit(exitCode)
}

async function confirm(message: string): Promise<boolean> {
  const { confirm } = await prompts(
    {
      name: 'confirm',
      type: 'confirm',
      initial: false,
      message,
    },
    {
      onCancel: () => {
        abort()
      },
    },
  )

  return confirm
}

async function question(message: string): Promise<string> {
  const { value } = await prompts(
    {
      name: 'value',
      type: 'text',
      message,
    },
    {
      onCancel: () => {
        abort()
      },
    },
  )

  return value
}

function header(message: string, opts?: { enable?: boolean }) {
  const { enable } = opts ?? {}
  if (!enable) return

  console.log(chalk.bold.green(`${message}\n`))
}
