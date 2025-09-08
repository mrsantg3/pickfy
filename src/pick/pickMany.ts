import type { Keys, PickResult } from "../types";
import { pick } from "./pick";

/** pickMany([obj], ["a"]) -> [{ a }] */
export function pickMany<T extends object, K extends readonly Keys<T>[]>(
    list: readonly T[],
    keys: K
): Array<PickResult<T, K>> {
    return list.map((item) => pick(item, keys));
}
