import type { PayloadRequest } from '../../../types/index.js'
import type { BaseJob, WorkflowConfig, WorkflowTypes } from '../../config/types/workflowTypes.js'
import type { RunTaskFunctionState } from './getRunTaskFunction.js'

import { calculateBackoffWaitUntil } from './calculateBackoffWaitUntil.js'

/**
 * This is called if a workflow catched an error. It determines if it's a final error
 * or not and handles logging.
 */
export function handleWorkflowError({
  error,
  job,
  req,
  state,
  workflowConfig,
}: {
  error: Error
  job: BaseJob
  req: PayloadRequest
  state: RunTaskFunctionState
  workflowConfig: WorkflowConfig<WorkflowTypes>
}): {
  hasFinalError: boolean
} {
  let hasFinalError = state.reachedMaxRetries // If any TASK reached max retries, the job has an error
  // Now let's handle workflow retries
  if (!hasFinalError && workflowConfig.retries) {
    const maxRetries =
      typeof workflowConfig.retries === 'object'
        ? workflowConfig.retries.attempts
        : workflowConfig.retries
    if (job.waitUntil) {
      // Check if waitUntil is in the past
      const waitUntil = new Date(job.waitUntil)
      if (waitUntil < new Date()) {
        // Outdated waitUntil, remove it
        delete job.waitUntil
      }
    }
    if (job.totalTried >= maxRetries) {
      state.reachedMaxRetries = true
      hasFinalError = true

      req.payload.logger.error({
        msg: 'Job has reached the maximum amount of retries determined by the workflow configuration.',
      })
    } else {
      // Job will retry. Let's determine when!
      const waitUntil: Date = calculateBackoffWaitUntil({
        retriesConfig: workflowConfig.retries,
        totalTried: job.totalTried ?? 0,
      })

      // Update job's waitUntil only if this waitUntil is later than the current one
      if (!job.waitUntil || waitUntil > new Date(job.waitUntil)) {
        job.waitUntil = waitUntil.toISOString()
      }
    }
  }

  req.payload.logger.error({ err: error, job, msg: 'Error running job' })

  return {
    hasFinalError,
  }
}