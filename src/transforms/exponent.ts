import { CallExpression, Collection, template } from 'jscodeshift';

/**
 * Convert Math.pow to exponentiation operator
 */
export function useExponent(ast: Collection) {
  ast
    .find(CallExpression, {
      callee: { object: { name: 'Math' }, property: { name: 'pow' } },
    })
    .replaceWith(
      ({ node }) =>
        template.expression`${node.arguments[0]} ** ${node.arguments[1]}`
    );
}
