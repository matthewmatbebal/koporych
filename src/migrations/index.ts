import * as migration_20260510_000000_init from './20260510_000000_init';
import * as migration_20260512_105404 from './20260512_105404';

export const migrations = [
  {
    up: migration_20260510_000000_init.up,
    down: migration_20260510_000000_init.down,
    name: '20260510_000000_init',
  },
  {
    up: migration_20260512_105404.up,
    down: migration_20260512_105404.down,
    name: '20260512_105404'
  },
];
