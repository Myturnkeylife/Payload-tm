import fs from 'fs';
import { promisify } from 'util';

import type { SanitizedCollectionConfig } from '../collections/config/types.js';
import type { SanitizedConfig } from '../config/types.js';
import type { PayloadRequest } from '../express/types.js';

import { mapAsync } from '../utilities/mapAsync.js';

const unlinkFile = promisify(fs.unlink);

type Args = {
  collectionConfig: SanitizedCollectionConfig
  config: SanitizedConfig
  req: PayloadRequest
}
/**
 * Remove temp files if enabled, as express-fileupload does not do this automatically
 */
export const unlinkTempFiles: (args: Args) => Promise<void> = async ({
  collectionConfig,
  config,
  req,
}) => {
  if (config.upload?.useTempFiles && collectionConfig.upload) {
    const { files } = req;
    const fileArray = Array.isArray(files) ? files : [files];
    await mapAsync(fileArray, async ({ file }) => {
      // Still need this check because this will not be populated if using local API
      if (file?.tempFilePath) {
        await unlinkFile(file.tempFilePath);
      }
    });
  }
};
