import { test } from 'uvu';
import { useObjectShorthand } from '../src/transforms/objectShorthand';
import { testCodeMod } from './utils';

testCodeMod(
  'simplify object literals to shorthand notation',
  useObjectShorthand,
  'chats.push({ username: username, message: msg });',
  'chats.push({ username, message: msg });'
);

test.run();
