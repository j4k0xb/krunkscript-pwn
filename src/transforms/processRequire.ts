import { Collection } from 'jscodeshift';

/**
 * Removes the `process` and `require` variable declarations
 */
export function removeProcessRequire(ast: Collection) {
  ast.findVariableDeclarators('process').at(0).remove();
  ast.findVariableDeclarators('require').at(0).remove();
}
