import { Collection, MemberExpression } from 'jscodeshift';

/**
 * Replaces all `this.GAME` with `GAME.`
 */
export function replaceThisGame(ast: Collection) {
  ast
    .find(MemberExpression, {
      object: { type: 'ThisExpression' },
      property: { name: 'GAME' },
    })
    .replaceWith(path => path.node.property);
}
