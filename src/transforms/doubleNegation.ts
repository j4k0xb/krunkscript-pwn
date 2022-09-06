import {
  ASTPath,
  Collection,
  ConditionalExpression,
  Expression,
  UnaryExpression,
} from 'jscodeshift';

/**
 * Removes double negations from if statements and ternaries
 */
export function removeDoubleNegation(ast: Collection) {
  ast
    .find(UnaryExpression, {
      operator: '!',
      argument: { operator: '!' },
    })
    .filter(path => isInLogicalExpression(path.parent))
    .replaceWith(path => (path.value.argument as UnaryExpression).argument);

  ast
    .find(UnaryExpression, {
      operator: '!',
      argument: { operator: '!' },
    })
    .filter(path => isTernary(path.parent))
    .forEach(path => {
      const conditional = path.parent.value as ConditionalExpression;
      conditional.test = (path.value.argument as UnaryExpression).argument
    });
}

function isInLogicalExpression(path: ASTPath<Expression>) {
  if (path.value.type === 'LogicalExpression')
    return isInLogicalExpression(path.parent);
  return path.value.type === 'IfStatement';
}

function isTernary(path: ASTPath<Expression>) {
  return path.value.type === 'ConditionalExpression';
}
