import path from 'path';
import findUp from 'find-up';
import fs from 'fs';

/**
* Returns the source and output paths from the nearest tsconfig.json file.
* If no tsconfig.json file is found, returns the current working directory.
* @returns An object containing the source and output paths.
*/
const getTSConfigPaths = (): { srcPath: string, outPath: string } => {
  const tsConfigPath = findUp.sync('tsconfig.json');

  if (!tsConfigPath) {
    return { srcPath: process.cwd(), outPath: process.cwd() };
  }

  const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf-8'));

  const srcPath = tsConfig.compilerOptions?.rootDir || process.cwd();
  const outPath = tsConfig.compilerOptions?.outDir || process.cwd();

  return { srcPath, outPath };
};


/**
 * Searches for a Payload configuration file.
 * @returns The absolute path to the Payload configuration file.
 * @throws An error if no configuration file is found.
 */
const findConfig = (): string => {
  // If the developer has specified a config path,
  // format it if relative and use it directly if absolute
  if (process.env.PAYLOAD_CONFIG_PATH) {
    if (path.isAbsolute(process.env.PAYLOAD_CONFIG_PATH)) {
      return process.env.PAYLOAD_CONFIG_PATH;
    }

    return path.resolve(process.cwd(), process.env.PAYLOAD_CONFIG_PATH);
  }

  const { srcPath, outPath } = getTSConfigPaths();

  const searchPaths = process.env.NODE_ENV === 'production' ? [outPath, srcPath] : [srcPath];

  // eslint-disable-next-line no-restricted-syntax
  for (const searchPath of searchPaths) {
    const configPath = findUp.sync((dir) => {
      const tsPath = path.join(dir, 'payload.config.ts');
      const hasTS = findUp.sync.exists(tsPath);

      if (hasTS) {
        return tsPath;
      }

      const jsPath = path.join(dir, 'payload.config.js');
      const hasJS = findUp.sync.exists(jsPath);

      if (hasJS) {
        return jsPath;
      }

      return undefined;
    }, { cwd: searchPath });

    if (configPath) {
      return configPath;
    }
  }

  throw new Error('Error: cannot find Payload config. Please create a configuration file located at the root of your current working directory called "payload.config.js" or "payload.config.ts".');
};

export default findConfig;
