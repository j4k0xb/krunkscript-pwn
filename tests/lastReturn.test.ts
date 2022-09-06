import { test } from 'uvu';
import { removeLastReturn } from '../src/transforms/lastReturn';
import { testCodeMod } from './utils';

testCodeMod(
  'remove the last return statement',
  removeLastReturn,
  'function onNetworkMessage(id, data) {}return { start };',
  'function onNetworkMessage(id, data) {}'
);

testCodeMod(
  'dont remove return inside a function',
  removeLastReturn,
  'function onNetworkMessage(id, data) {return { data }}',
  'function onNetworkMessage(id, data) {return { data }}'
);

test.run();
