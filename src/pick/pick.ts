import type { Keys, PickResult } from "../types";

import {hasOwn} from "../util/hasOwn";

/** pick(obj, ["a","b"]) -> { a, b } */
export function pick<T extends object, K extends readonly Keys<T>[]>(
    obj: T,
    keys: K
): PickResult<T, K> {
    const out = {} as PickResult<T, K>;
    for (const k of keys) {
        if (hasOwn(obj, k)) (out as any)[k] = (obj as any)[k];
    }
    return out;
}
