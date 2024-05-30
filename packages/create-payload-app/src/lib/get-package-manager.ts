import execa from 'execa'
import fse from 'fs-extra'

import type { CliArgs, PackageManager } from '../types.js'

export async function getPackageManager(args: {
  cliArgs?: CliArgs
  projectDir: string
}): Promise<PackageManager> {
  const { cliArgs, projectDir } = args

  try {
    // Check for yarn.lock, package-lock.json, or pnpm-lock.yaml
    let detected: PackageManager = 'npm'
    if (
      cliArgs?.['--use-pnpm'] ||
      fse.existsSync(`${projectDir}/pnpm-lock.yaml`) ||
      (await commandExists('pnpm'))
    ) {
      detected = 'pnpm'
    } else if (
      cliArgs?.['--use-yarn'] ||
      fse.existsSync(`${projectDir}/yarn.lock`) ||
      (await commandExists('yarn'))
    ) {
      detected = 'yarn'
    } else if (cliArgs?.['--use-npm'] || fse.existsSync(`${projectDir}/package-lock.json`)) {
      detected = 'npm'
    }

    return detected
  } catch (error) {
    return 'npm'
  }
}

async function commandExists(command: string): Promise<boolean> {
  try {
    await execa.command(`command -v ${command}`)
    return true
  } catch {
    return false
  }
}
