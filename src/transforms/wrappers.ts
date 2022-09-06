import {
  CallExpression,
  Collection,
  template,
  TryStatement,
} from 'jscodeshift';

const { expression } = template;

/**
 * Inlines the following wrapper functions:
 * ```js
 * const SM = (m) => m.replace(/\bthis\.GAME\b/g, "GAME").replace(/V_(\w+)/g, "$1").replace(/\bdelete\b/g, "remove").replace(/of #<Object>/g, "");
 * const EH = (m) => { throw new Error("RUNTIME ERROR: " + SM(m).replace(/^RUNTIME ERROR: /g, "")) };
 * const RE = (l, c, m) => { throw new Error(`${l}:${c} ${m}`) };
 * const RP = (s) => s.replace(/V_(\w+)/g, "$1");
 * const L = (x) => (x.length || 0)
 * const NE = (x) => !!Object.keys(x || {}).length
 * const B = (x) => !!x
 * const N = (x) => (parseInt(x) || 0);
 * const F = (x) => (parseFloat(x) || 0);
 * const S = (x) => (x + "");
 * const O = (x) => (typeof x === "object" && !Array.isArray(x) ? x : {});
 * const A = (x, f) => (Array.isArray(x) ? (x.forEach((v, i) => x[i] = A(v, f)), x) : f(x));
 * const HP = (x, p) => x.hasOwnProperty(p);
 * const BC = (a, i, l, c) => (a.hasOwnProperty(N(i)) ? N(i) : RE(l, c, "Index out of range."));
 * const FC = (f, p, l, c) => (typeof f === "function" ? f : RE(l, c, `Property "${p}" is not an an "action".`));
 * const DE = (x, i) => (Array.isArray(x) ? x.splice(i, 1) : 0);
 * const OE = (x) => Object.entries(x || {}).map(p => { return { V_key: RP(p[0]), V_value: p[1] } });
 *```
 */
export function inlineWrappers(ast: Collection) {
  inlineA(ast);
  inlineBC(ast);
  inlineDE(ast);
  inlineF(ast);
  inlineFC(ast);
  inlineHP(ast);
  inlineL(ast);
  inlineNE(ast);
  inlineS(ast);
  removeTryCatch(ast);
  removeFnDeclarators(ast);
}

export function removeFnDeclarators(ast: Collection) {
  const names = [
    'SM',
    'EH',
    'RE',
    'RP',
    'L',
    'NE',
    'B',
    'N',
    'F',
    'S',
    'O',
    'A',
    'HP',
    'BC',
    'FC',
    'DE',
    'OE',
    'V_UTILS',
    'V_Math',
  ];
  names.forEach(name => ast.findVariableDeclarators(name).at(0).remove());
}

/**
 * Simplifies all `A` map calls (assumes the arg has the correct type).
 *
 * Example: `A(num, F)` -> `num`
 *
 * Source:
 * ```js
 * const A = (x, f) => (Array.isArray(x) ? (x.forEach((v, i) => x[i] = A(v, f)), x) : f(x));
 * ```
 */
export function inlineA(ast: Collection) {
  ast
    .find(CallExpression, {
      callee: { name: 'A' },
    })
    .replaceWith(({ node }) => node.arguments[0]);
}

/**
 * Simplifies all `BC` array access calls (assumes the index exists).
 *
 * Example: `arr[BC(arr, i, 1, 2)]` -> `arr[i]`
 *
 * Source:
 * ```js
 * const RE = (l, c, m) => throw new Error(`${l}:${c} ${m}`);
 * const N = x => parseInt(x) || 0;
 * const BC = (a, i, l, c) => a.hasOwnProperty(N(i)) ? N(i) : RE(l, c, 'Index out of range');
 * ```
 */
export function inlineBC(ast: Collection) {
  ast
    .find(CallExpression, {
      callee: { name: 'BC' },
    })
    .replaceWith(({ node }) => node.arguments[1]);
}

/**
 * Simplifies all `DE` array splices (assumes an array is passed).
 *
 * Example: `DE(arr, 3)` -> `arr.splice(3, 1)`
 *
 * Source:
 * ```js
 * const DE = (x, i) => (Array.isArray(x) ? x.splice(i, 1) : 0);
 * ```
 */
export function inlineDE(ast: Collection) {
  ast
    .find(CallExpression, {
      callee: { name: 'DE' },
    })
    .replaceWith(
      ({ node }) =>
        expression`${node.arguments[0]}.splice(${node.arguments[1]}, 1)`
    );
}

/**
 * Simplifies all `F` float convert calls (assumes a number is passed).
 *
 * Example: `F(data.x)` -> data.x
 *
 * Source:
 * ```js
 * const F = (x) => (parseFloat(x) || 0);
 * ```
 */
export function inlineF(ast: Collection) {
  ast
    .find(CallExpression, {
      callee: { name: 'F' },
    })
    .replaceWith(({ node }) => node.arguments[0]);
}

/**
 * Simplifies all `FC` function type checks.
 *
 * Example: `FC(V_cube.V_delete,458,12)()` -> `V_cube.V_delete()`
 *
 * Source:
 * ```js
 * const FC = (f, p, l, c) => (typeof f === "function" ? f : RE(l, c, `Property "${p}" is not an an "action".`));
 * ```
 */
export function inlineFC(ast: Collection) {
  ast
    .find(CallExpression, {
      callee: { name: 'FC' },
    })
    .replaceWith(({ node }) => node.arguments[0]);
}

/**
 * Inlines all `HP` hasOwnProperty calls.
 *
 * Example: `HP(obj, 'prop')` -> `obj.hasOwnProperty('prop')`
 *
 * Source:
 * ```js
 * const HP = (x, p) => x.hasOwnProperty(p);
 * ```
 */
export function inlineHP(ast: Collection) {
  ast
    .find(CallExpression, {
      callee: { name: 'HP' },
    })
    .replaceWith(
      ({ node }) =>
        expression`${node.arguments[0]}.hasOwnProperty(${node.arguments[1]})`
    );
}

/**
 * Simplifies all `L` array length calls.
 *
 * Example: `L(arr)` -> `arr.length`
 *
 * Source:
 * ```js
 * const L = (x) => x.length || 0;
 * ```
 */
export function inlineL(ast: Collection) {
  ast
    .find(CallExpression, {
      callee: { name: 'L' },
    })
    .replaceWith(({ node }) => expression`${node.arguments[0]}.length`);
}

/**
 * "Simplifies" all `NE` non-empty object check calls.
 *
 * Example: `NE(obj)` -> `Object.keys(obj).length > 0`
 *
 * Source:
 * ```js
 * const NE = (x) => !!Object.keys(x || {}).length
 * ```
 */
export function inlineNE(ast: Collection) {
  ast
    .find(CallExpression, {
      callee: { name: 'NE' },
    })
    .replaceWith(
      ({ node }) => expression`Object.keys(${node.arguments[0]}).length > 0`
    );
}

/**
 * Simplifies all `S` string convert calls (assumes a string is passed).
 *
 * Example: `S(name)` -> name
 *
 * Source:
 * ```js
 * const S = (x) => (x + "");
 * ```
 */
export function inlineS(ast: Collection) {
  ast
    .find(CallExpression, {
      callee: { name: 'S' },
    })
    .replaceWith(({ node }) => node.arguments[0]);
}

/**
 * Removes all try-catch statements (contained in public actions)
 */
export function removeTryCatch(ast: Collection) {
  ast.find(TryStatement).replaceWith(path => path.node.block.body);
}
