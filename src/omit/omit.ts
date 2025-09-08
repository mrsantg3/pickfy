import type { Keys, OmitResult } from "../types";

/** omit(obj, ["a"]) -> remove keys */
export function omit<T extends object, K extends readonly Keys<T>[]>(
    obj: T,
    keys: K
): OmitResult<T, K> {
    const out: any = { ...obj };
    for (const k of keys) delete out[k];
    return out;
}
