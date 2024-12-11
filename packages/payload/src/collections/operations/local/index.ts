import * as auth from '../../../auth/operations/local/index.js'
/* eslint-disable no-restricted-exports */
import { findOne as findPreferenceByKey } from '../../../preferences/operations/findOne.js'
import { update as updatePreference } from '../../../preferences/operations/update.js'
import count from './count.js'
import countVersions from './countVersions.js'
import create from './create.js'
import deleteLocal from './delete.js'
import { duplicate } from './duplicate.js'
import { findLocal } from './find.js'
import findByID from './findByID.js'
import findVersionByID from './findVersionByID.js'
import findVersions from './findVersions.js'
import restoreVersion from './restoreVersion.js'
import update from './update.js'

export default {
  auth,
  count,
  countVersions,
  create,
  deleteLocal,
  duplicate,
  find: findLocal,
  findByID,
  findPreferenceByKey,
  findVersionByID,
  findVersions,
  restoreVersion,
  update,
  updatePreference,
}
