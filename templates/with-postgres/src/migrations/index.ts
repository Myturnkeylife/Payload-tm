import * as migration_20241206_203050_initial from './20241206_203050_initial'

export const migrations = [
  {
    up: migration_20241206_203050_initial.up,
    down: migration_20241206_203050_initial.down,
    name: '20241206_203050_initial',
  },
]
