// Type definitions for selectorator 3.3
// Project: https://github.com/planttheidea/selectorator#readme
// Definitions by: Nick McCurdy <https://github.com/nickmccurdy>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { deepEqual } from "fast-equals";
import { OutputSelector, Selector } from "reselect";

export as namespace selectorator;

export type Path<S, R> =
  | Selector<S, R>
  | string
  | number
  | Array<string | number>;
export type ArgumentPath<S, R> =
  | Path<S, R>
  | { path: Path<S, R>; argIndex: number };

export interface Options<O extends any[] = any[]> {
  deepEqual: boolean;
  isEqual: typeof deepEqual;
  memoizer: <F extends (...options: O) => any>(func: F, ...options: O) => F;
  memoizerParams: O;
}

export default function createSelector<S, R extends any[], T>(
  paths: [...Array<ArgumentPath<S, R>>] | Record<string, ArgumentPath<S, R>>,
  getComputedValue?: (...results: R) => T,
  options?: Partial<Options>
): OutputSelector<S, T, (...results: R) => T>;
