import {PickWithDefaultsResult} from "../types";
import {hasOwn} from "../util/hasOwn";

/** pickWithDefaults(obj, ["k1","k2"], { k1: "default" }) */
export function pickWithDefaults<
    T extends object,
    K extends readonly string[],
    D extends Partial<Record<K[number], unknown>>
>(
    obj: T,
    keys: K,
    defaults: D
): PickWithDefaultsResult<T, K, D> {
    const out = {} as PickWithDefaultsResult<T, K, D>;
    for (const k of keys) {
        const has = hasOwn(obj, k);
        (out as any)[k] = has ? (obj as any)[k] : (defaults as any)[k];
    }
    return out;
}