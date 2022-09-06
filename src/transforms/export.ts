import {
  Collection,
  exportNamedDeclaration,
  FunctionDeclaration,
} from 'jscodeshift';

const actions = [
  'onControllerHeld',
  'onControllerPress',
  'onControllerUp',
  'onDIVClicked',
  'onKeyHeld',
  'onKeyPress',
  'onKeyUp',
  'onMouseClick',
  'onMouseScroll',
  'onMouseUp',
  'onNetworkMessage',
  'onPlayerDeath',
  'onPlayerSpawn',
  'onPlayerUpdate',
  'render',
  'start',
  'update',
];

/**
 * Exports public action
 */
export function exportActions(ast: Collection) {
  ast
    .find(FunctionDeclaration)
    .filter(path => actions.includes(path.node.id?.name!))
    .replaceWith(path => exportNamedDeclaration(path.node));
}
