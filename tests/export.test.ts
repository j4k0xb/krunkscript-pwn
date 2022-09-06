import { test } from 'uvu';
import { exportActions } from '../src/transforms/export';
import { testCodeMod } from './utils';

testCodeMod(
  'exports public actions',
  exportActions,
  'function start() { }',
  'export function start() { }'
);

testCodeMod(
  'dont export private actions',
  exportActions,
  'function str_split() { }',
  'function str_split() { }'
);

test.run();
