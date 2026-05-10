import * as migration_20260510_000000_init from './20260510_000000_init';

export const migrations = [
  {
    up: migration_20260510_000000_init.up,
    down: migration_20260510_000000_init.down,
    name: '20260510_000000_init',
  },
];
