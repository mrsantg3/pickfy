import type { Keys, PickResult } from "../types";
import { pick } from "./pick";

/** pickWhere(array, ["a","b"], predicate) -> filtra e pick */
export function pickWhere<T extends object, K extends readonly Keys<T>[]>(
    list: readonly T[],
    keys: K,
    predicate: (item: T) => boolean
): Array<PickResult<T, K>> {
    return list.filter(predicate).map((item) => pick(item, keys));
}
