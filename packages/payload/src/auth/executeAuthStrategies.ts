import type { AuthStrategyFunctionArgs, User } from './index.js'

export const executeAuthStrategies = async (
  args: AuthStrategyFunctionArgs,
): Promise<User | null> => {
  return args.payload.authStrategies.reduce(async (accumulatorPromise, strategy) => {
    const authUser = await accumulatorPromise
    if (!authUser) {
      return strategy.authenticate(args)
    }
    return authUser
  }, Promise.resolve(null))
}
