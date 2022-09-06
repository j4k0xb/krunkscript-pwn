import { CallExpression, Collection, MemberExpression } from 'jscodeshift';

/**
 * Removes all `.bind(this)` calls
 */
export function removeBindThis(ast: Collection) {
  ast
    .find(CallExpression, {
      callee: { property: { name: 'bind' } },
    })
    .replaceWith(path => {
      const memberExpr = path.node.callee as MemberExpression; // object.bind
      return memberExpr.object;
    });
}
