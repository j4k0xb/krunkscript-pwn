import { dedent } from 'ts-dedent';
import { test } from 'uvu';
import { removeLC } from '../src/transforms/LC';
import { testCodeMod } from './utils';

testCodeMod(
  'remove all LC variables/checks/increments',
  removeLC,
  dedent`
  let LC = 0;
  function start() {
    LC = 0;
    for (let i = 0; i < 10; i++) {
      if (LC++ > 1e5) RE(8, 1, 'Loop timed out.');
      GAME.log(i);
    }
  }`,
  dedent`
  function start() {
    for (let i = 0; i < 10; i++) {
      GAME.log(i);
    }
  }`
);

test.run();
