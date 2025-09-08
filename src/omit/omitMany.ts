import {Keys, OmitResult} from "../types";
import {omit} from "./omit";

/** omitMany([obj], ["a"]) */
export function omitMany<T extends object, K extends readonly Keys<T>[]>(
    list: readonly T[],
    keys: K
): Array<OmitResult<T, K>> {
    return list.map((item) => omit(item, keys));
}