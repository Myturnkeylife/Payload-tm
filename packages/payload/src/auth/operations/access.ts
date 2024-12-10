import type { PayloadRequest } from '../../types/index.js'
import type { SanitizedPermissions } from '../types.js'

import { killTransaction } from '../../utilities/killTransaction.js'
import { adminInit as adminInitTelemetry } from '../../utilities/telemetry/events/adminInit.js'
import { getAccessResults } from '../getAccessResults.js'

type Arguments = {
  locale?: string
  req: PayloadRequest
}

export const accessOperation = async (args: Arguments): Promise<SanitizedPermissions> => {
  const { locale, req } = args

  adminInitTelemetry(req)

  try {
    return getAccessResults({ locale, req })
  } catch (e: unknown) {
    await killTransaction(req)
    throw e
  }
}
