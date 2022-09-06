import jscodeshift from 'jscodeshift';
import { format } from 'prettier';
import { transforms } from '../transforms';

export function deobfuscate(source: string) {
  // wtf
  source = source.replace(/（/g, '(').replace(/）/g, ')');

  const ast = jscodeshift(source);

  for (const transform of transforms) {
    transform(ast);
  }

  return format(ast.toSource(), {
    singleQuote: true,
    parser: 'babel',
  });
}
