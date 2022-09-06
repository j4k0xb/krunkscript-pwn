import { test } from 'uvu';
import {
  inlineA,
  inlineBC,
  inlineDE,
  inlineF,
  inlineFC,
  inlineHP,
  inlineL,
  inlineNE,
  inlineS,
  removeTryCatch,
} from '../src/transforms/wrappers';
import { testCodeMod } from './utils';

testCodeMod('inline an A call', inlineA, 'A(grid.scale, S)', 'grid.scale');

testCodeMod(
  'inline a BC call',
  inlineBC,
  'tiles[BC(tiles, x, 42, 13)]',
  'tiles[x]'
);
testCodeMod(
  'inline nested BC calls',
  inlineBC,
  'tiles[BC(tiles, x, 46, 28)][BC(tiles[BC(tiles, x, 46, 28)], y+1, 46, 28)]',
  'tiles[x][y+1]'
);

testCodeMod('inline a DE call', inlineDE, 'DE(arr, 0);', 'arr.splice(0, 1);');

testCodeMod(
  'inline an F call',
  inlineF,
  'player.velocity.x = F(data.x) * -0.2;',
  'player.velocity.x = data.x * -0.2;'
);

testCodeMod(
  'inline an FC call',
  inlineFC,
  'FC(preview.playAnim, 43, 8)("Reload", 1)',
  'preview.playAnim("Reload", 1)'
);

testCodeMod(
  'inline an HP call',
  inlineHP,
  'if (HP(x, "prop")) { }',
  'if (x.hasOwnProperty("prop")) { }'
);

testCodeMod(
  'inline an L call',
  inlineL,
  'for (let i = 0; i < L(buffer); i++) { }',
  'for (let i = 0; i < buffer.length; i++) { }'
);

testCodeMod(
  'inline an NE call',
  inlineNE,
  'NE(obj)',
  'Object.keys(obj).length > 0'
);

testCodeMod(
  'inline an S call',
  inlineS,
  '"Round " + S(i + 1) + " "',
  '"Round " + (i + 1) + " "'
);

testCodeMod(
  'remove try-catch statement',
  removeTryCatch,
  'try { first = false; } catch (e) { EH(e.message); }',
  'first = false;'
);

test.run();
