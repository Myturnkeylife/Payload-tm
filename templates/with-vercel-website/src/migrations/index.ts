import * as migration_20241204_024245_initial from './20241204_024245_initial'

export const migrations = [
  {
    up: migration_20241204_024245_initial.up,
    down: migration_20241204_024245_initial.down,
    name: '20241204_024245_initial',
  },
]
