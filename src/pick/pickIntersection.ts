import {hasOwn} from "../util/hasOwn";
import {Keys} from "../types";

/** pickIntersection([{a,b},{a,b,c}], ["a","b"]) -> { a:[...], b:[...] } */
export function pickIntersection<T extends object, K extends readonly Keys<T>[]>(
    list: readonly T[],
    keys: K
): Record<K[number], unknown[]> {
    const out = {} as Record<K[number], unknown[]>;
    for (const k of keys) out[k] = [];
    for (const item of list) {
        for (const k of keys) {
            if (hasOwn(item, k)) out[k].push((item as any)[k]);
        }
    }
    return out;
}