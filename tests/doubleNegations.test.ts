import { test } from 'uvu';
import { removeDoubleNegation } from '../src/transforms/doubleNegation';
import { testCodeMod } from './utils';

testCodeMod(
  'remove if double negation',
  removeDoubleNegation,
  'if (!!abc) { }',
  'if (abc) { }'
);

testCodeMod(
  'remove if double negation in logical expression',
  removeDoubleNegation,
  'if (!!abc && xyz) { }',
  'if (abc && xyz) { }'
);

testCodeMod(
  'remove ternary double negation',
  removeDoubleNegation,
  'group = !!data.r ? 1 : 0',
  'group = data.r ? 1 : 0',
);

testCodeMod(
  'dont remove other double negation',
  removeDoubleNegation,
  '(x) => !!Object.keys(x || {}).length',
  '(x) => !!Object.keys(x || {}).length'
);

test.run();
