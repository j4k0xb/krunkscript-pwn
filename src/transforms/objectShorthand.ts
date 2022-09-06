import { Collection, Property } from 'jscodeshift';

/**
 * Converts object properties to shorthand notation
 */
export function useObjectShorthand(ast: Collection) {
  ast
    .find(Property, {
      shorthand: false,
      value: { type: 'Identifier' },
    })
    .forEach(path => (path.node.shorthand = true));
}
