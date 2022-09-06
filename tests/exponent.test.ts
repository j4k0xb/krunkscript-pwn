import { test } from 'uvu';
import { useExponent } from '../src/transforms/exponent';
import { testCodeMod } from './utils';

testCodeMod(
  'replace Math.pow with exponentation operator',
  useExponent,
  'let colorMax = Math.pow(2, colorBits) - 1',
  'let colorMax = 2 ** colorBits - 1'
);

test.run();
