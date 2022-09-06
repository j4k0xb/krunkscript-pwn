import { test } from 'uvu';
import { removePrefixes } from '../src/transforms/prefixes';
import { testCodeMod } from './utils';

testCodeMod(
  'remove V_ prefix from identifiers',
  removePrefixes,
  'function V_start() { GAME.V_log("HELLO WORLD", V_className); }',
  'function start() { GAME.log("HELLO WORLD", className); }'
);

testCodeMod(
  'remove keyword V_ prefix from property',
  removePrefixes,
  'cube.V_delete();',
  'cube.delete();'
);

testCodeMod(
  'dont create invalid identifiers',
  removePrefixes,
  `function V_function(V_let) { }
  const V_var = function(V_const) { }
  const V_break = (V_for) => 0;
  let V_class = 3;
  if (V_function === "start_ability") {}
  let V_while = 4;`,
  `function V_function(V_let) { }
  const V_var = function(V_const) { }
  const V_break = (V_for) => 0;
  let V_class = 3;
  if (V_function === "start_ability") {}
  let V_while = 4;`
);

test.run();
