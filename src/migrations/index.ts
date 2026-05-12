import * as migration_20260512_142820 from './20260512_142820';

export const migrations = [
  {
    up: migration_20260512_142820.up,
    down: migration_20260512_142820.down,
    name: '20260512_142820'
  },
];
