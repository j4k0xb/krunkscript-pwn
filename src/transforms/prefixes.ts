import { Collection, Identifier } from 'jscodeshift';

/**
 * Starts with `V_` and doesn't end up as a keyword
 */
const noKeywordIdentifier =
  /^V_(?!(break|case|catch|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with|implements|interface|let|package|private|protected|public|static|yield|class|const|enum|export|extends|import|super|await)\b)\w+$/;

/**
 * Removes all `V_` prefixes of identifiers
 */
export function removePrefixes(ast: Collection) {
  ast
    .find(Identifier, (i: Identifier) => /^V_\w+$/.test(i.name))
    .filter(
      path =>
        !path.scope.lookup(path.node.name) || // properties, ...
        noKeywordIdentifier.test(path.node.name) // variables, parameters, ...
    )
    .forEach(path => {
      path.node.name = path.node.name.replace('V_', '');
    });
}
