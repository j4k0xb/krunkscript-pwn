import { test } from 'uvu';
import { removeBindThis } from '../src/transforms/bindThis';
import { testCodeMod } from './utils';

testCodeMod(
  'remove .bind(this) calls',
  removeBindThis,
  'GAME.CAMERA.detach.bind(this)();return {start: start.bind(this)};',
  'GAME.CAMERA.detach();return {start: start};'
);

test.run();
