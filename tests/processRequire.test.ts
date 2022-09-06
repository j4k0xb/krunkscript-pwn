import { test } from 'uvu';
import { removeProcessRequire } from '../src/transforms/processRequire';
import { testCodeMod } from './utils';

testCodeMod(
  'remove the process variable declaration',
  removeProcessRequire,
  'const process = {};',
  ''
);

testCodeMod(
  'remove the require variable declaration',
  removeProcessRequire,
  'const require = {};',
  ''
);

test.run();
