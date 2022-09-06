import { removeBindThis } from './bindThis';
import { removeDoubleNegation } from './doubleNegation';
import { useExponent } from './exponent';
import { exportActions } from './export';
import { removeLastReturn } from './lastReturn';
import { removeLC } from './LC';
import { useObjectShorthand } from './objectShorthand';
import { removePrefixes } from './prefixes';
import { removeProcessRequire } from './processRequire';
import { replaceThisGame } from './thisGame';
import { removeUseStrict } from './useStrict';
import { inlineWrappers } from './wrappers';

export const transforms = [
  removeLastReturn,
  removeUseStrict,
  removeBindThis,
  replaceThisGame,
  removeLC,
  removeProcessRequire,
  inlineWrappers,
  removeDoubleNegation,
  removePrefixes,
  exportActions,
  useObjectShorthand,
  useExponent,
];
