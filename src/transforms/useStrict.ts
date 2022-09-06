import { Collection, ExpressionStatement } from 'jscodeshift';

/**
 * Removes the first `"use strict";` statement
 */
export function removeUseStrict(ast: Collection) {
  ast
    .find(ExpressionStatement, {
      expression: { value: 'use strict' },
    })
    .at(0)
    .remove();
}
