import { test } from 'uvu';
import { replaceThisGame } from '../src/transforms/thisGame';
import { testCodeMod } from './utils';

testCodeMod(
  'replace all this.GAME with GAME.',
  replaceThisGame,
  'this.GAME.V_log("HELLO WORLD");',
  'GAME.V_log("HELLO WORLD");'
);

test.run();
