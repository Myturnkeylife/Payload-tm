import fs from 'fs'
import path from 'path'

/**
 * Recursively copy files from src to dest
 *
 * @internal
 */
export function copyRecursiveSync(src: string, dest: string, debug?: boolean) {
  const exists = fs.existsSync(src)
  const stats = exists && fs.statSync(src)
  const isDirectory = exists && stats !== false && stats.isDirectory()
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true })
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName))
    })
  } else {
    fs.copyFileSync(src, dest)
  }
}
