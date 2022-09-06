import { Collection, ExpressionStatement, IfStatement } from 'jscodeshift';

/**
 * Removes all LC variables/checks/increments
 */
export function removeLC(ast: Collection) {
  // top-level declaration
  ast.findVariableDeclarators('LC').remove();

  // LC = 0;
  ast
    .find(ExpressionStatement, {
      expression: { left: { name: 'LC' } },
    })
    .remove();

  // if (LC++ > 1e5) RE(8, 1, 'Loop timed out.');
  ast
    .find(IfStatement, {
      test: { left: { argument: { name: 'LC' } } },
    })
    .remove();
}
