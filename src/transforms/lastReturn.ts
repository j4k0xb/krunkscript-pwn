import { Collection, ReturnStatement } from 'jscodeshift';

/**
 * Removes the last top-level return statement
 */
export function removeLastReturn(ast: Collection) {
  ast
    .find(ReturnStatement)
    .filter(path => path.parent.value.type === 'Program')
    .at(-1)
    .remove();
}
