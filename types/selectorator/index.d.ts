// Type definitions for selectorator 3.3
// Project: https://github.com/planttheidea/selectorator#readme
// Definitions by: Nick McCurdy <https://github.com/nickmccurdy>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { deepEqual } from "fast-equals";
import { Selector } from "reselect";

export as namespace selectorator;

export type Path<S, R> =
  | Selector<S, R>
  | string
  | number
  | Array<string | number>;
export type ArgumentPath<S, R> =
  | Path<S, R>
  | { path: Path<S, R>; argIndex: number };
export type MultiSelector<S extends any[], R> = (...states: S) => R;
export type OutputMultiSelector<S extends any[], R, C> = MultiSelector<S, R> & {
  resultFunc: C;
  recomputations: () => number;
  resetRecomputations: () => number;
};

export interface Options<O extends any[] = any[]> {
  deepEqual: boolean;
  isEqual: typeof deepEqual;
  memoizer: <F extends (...options: O) => any>(func: F, ...options: O) => F;
  memoizerParams: O;
}

export default function createSelector<S extends any[], R extends any[], T>(
  paths: Array<ArgumentPath<S, R>> | Record<string, ArgumentPath<S, R>>,
  getComputedValue?: (...results: R) => T,
  options?: Partial<Options>
): OutputMultiSelector<S, T, (...results: R) => T>;
