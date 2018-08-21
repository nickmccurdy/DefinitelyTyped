// Type definitions for selectorator 3.3
// Project: https://github.com/planttheidea/selectorator#readme
// Definitions by: Nick McCurdy <https://github.com/nickmccurdy>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { deepEqual } from "fast-equals";
import { OutputSelector, Selector } from "reselect";

export as namespace selectorator;

type Path<S, R> = Selector<S, R> | string | number | Array<string | number>;
type ArgumentPath<S, R> = Path<S, R> | { path: Path<S, R>; argIndex: number };

interface Options<O extends any[] = any[]> {
    deepEqual: boolean;
    isEqual: typeof deepEqual;
    memoizer: <F extends (...options: O) => any>(func: F, ...options: O) => F;
    memoizerParams: O;
}

export default function createSelector<S, R extends any[], T>(
    paths: [...ArgumentPath<S, R>[]] | Record<string, ArgumentPath<S, R>>,
    getComputedValue?: (...results: R) => T,
    options?: Partial<Options>
): OutputSelector<S, T, (...results: R) => T>;
