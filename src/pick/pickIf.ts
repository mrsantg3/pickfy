import {Keys} from "../types";

/** pickIf(obj, pred) -> pega apenas chaves com pred(value) === true */
export function pickIf<T extends object>(
    obj: T,
    predicate: (value: T[keyof T], key: Keys<T>) => boolean
): Partial<T> {
    const out: Partial<T> = {};
    for (const k in obj) {
        const v = (obj as any)[k];
        if (predicate(v, k as Keys<T>)) (out as any)[k] = v;
    }
    return out;
}