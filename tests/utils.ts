import j from 'jscodeshift';
import { test } from 'uvu';
import * as assert from 'uvu/assert';

type CodeMod = (ast: j.Collection) => void;

export function testCodeMod(
  name: string,
  mod: CodeMod,
  source: string,
  target: string
) {
  test(name, () => {
    const ast = j(source);
    mod(ast);
    assert.is(ast.toSource(), target);
  });
}
