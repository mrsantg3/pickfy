import {Keys} from "../types";

/** omitWhere(obj, (k,v)=>boolean) */
export function omitWhere<T extends object>(
    obj: T,
    predicate: (key: Keys<T>, value: T[keyof T]) => boolean
): Partial<T> {
    const out: Partial<T> = {};
    for (const k in obj) {
        const v = (obj as any)[k];
        if (!predicate(k as Keys<T>, v)) (out as any)[k] = v;
    }
    return out;
}