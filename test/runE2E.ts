import { spawn } from 'child_process'
import globby from 'globby'
import minimist from 'minimist'
import path from 'path'
import shelljs from 'shelljs'
import slash from 'slash'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

shelljs.env.DISABLE_LOGGING = 'true'

const prod = process.argv.includes('--prod')
process.argv = process.argv.filter((arg) => arg !== '--prod')
if (prod) {
  process.env.PAYLOAD_TEST_PROD = 'true'
  shelljs.env.PAYLOAD_TEST_PROD = 'true'
}

const playwrightBin = path.resolve(dirname, '../node_modules/.bin/playwright')

const testRunCodes: { code: number; suiteName: string }[] = []
const { _: args, bail, part } = minimist(process.argv.slice(2))
const suiteName = args[0]

// Run all
if (!suiteName) {
  let files = await globby(`${path.resolve(dirname).replace(/\\/g, '/')}/**/*e2e.spec.ts`)

  const totalFiles = files.length

  if (part) {
    if (!part.includes('/')) {
      throw new Error('part must be in the format of "1/2"')
    }

    const [partToRun, totalParts] = part.split('/').map((n) => parseInt(n))

    if (partToRun > totalParts) {
      throw new Error('part cannot be greater than totalParts')
    }

    const partSize = Math.ceil(files.length / totalParts)
    const start = (partToRun - 1) * partSize
    const end = start + partSize
    files = files.slice(start, end)
  }

  if (files.length !== totalFiles) {
    console.log(`\n\nExecuting part ${part}: ${files.length} of ${totalFiles} E2E tests...\n\n`)
  } else {
    console.log(`\n\nExecuting all ${files.length} E2E tests...\n\n`)
  }
  console.log(`${files.join('\n')}\n`)

  for (const file of files) {
    clearWebpackCache()
    const baseTestFolder = file.split('/test/')[1].split('/')[0]
    await executePlaywright(file, baseTestFolder, bail)
  }
} else {
  // Run specific suite
  clearWebpackCache()
  const suitePath = path.resolve(dirname, suiteName, 'e2e.spec.ts').replaceAll('__', '/')
  const baseTestFolder = suiteName.split('__')[0]
  await executePlaywright(suitePath, baseTestFolder)
}

console.log('\nRESULTS:')
testRunCodes.forEach((tr) => {
  console.log(`\tSuite: ${tr.suiteName}, Success: ${tr.code === 0}`)
})
console.log('\n')

// baseTestFolder is the most top level folder of the test suite, that contains the payload config.
// We need this because pnpm dev for a given test suite will always be run from the top level test folder,
// not from a nested suite folder.
async function executePlaywright(suitePath: string, baseTestFolder: string, bail = false) {
  console.log(`Executing ${suitePath}...`)
  const playwrightCfg = path.resolve(
    dirname,
    `${bail ? 'playwright.bail.config.ts' : 'playwright.config.ts'}`,
  )

  const spawnDevArgs: string[] = ['dev', baseTestFolder, '--start-memory-db']
  if (prod) {
    spawnDevArgs.push('--prod')
  }

  process.env.START_MEMORY_DB = 'true'

  const child = spawn('pnpm', spawnDevArgs, {
    stdio: 'inherit',
    cwd: path.resolve(dirname, '..'),
    env: {
      ...process.env,
    },
  })

  const cmd = slash(`${playwrightBin} test ${suitePath} -c ${playwrightCfg}`)
  console.log('\n', cmd)
  const { code, stdout } = shelljs.exec(cmd, {
    cwd: path.resolve(dirname, '..'),
  })
  const suite = path.basename(path.dirname(suitePath))
  const results = { code, suiteName: suite }

  if (code) {
    if (bail) {
      console.error(`TEST FAILURE DURING ${suite} suite.`)
    }
    child.kill(1)
    process.exit(1)
  } else {
    child.kill()
  }
  testRunCodes.push(results)

  return stdout
}

function clearWebpackCache() {
  const webpackCachePath = path.resolve(dirname, '../node_modules/.cache/webpack')
  shelljs.rm('-rf', webpackCachePath)
}
