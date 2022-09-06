import { test } from 'uvu';
import { removeUseStrict } from '../src/transforms/useStrict';
import { testCodeMod } from './utils';

testCodeMod(
  'remove the "use strict"; statement',
  removeUseStrict,
  '"use strict";const x=3;',
  'const x=3;'
);

test.run();
