import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260119_092727 from './20260119_092727';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260119_092727.up,
    down: migration_20260119_092727.down,
    name: '20260119_092727'
  },
];
