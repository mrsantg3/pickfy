import {hasOwn} from "../util/hasOwn";
import {Keys} from "../types";

/** pickUnique(list, "email") -> valores únicos */
export function pickUnique<T extends object, K extends Keys<T>>(
    list: readonly T[],
    key: K
): Array<T[K]> {
    const set = new Set<T[K]>();
    for (const item of list) if (hasOwn(item, key)) set.add((item as any)[key]);
    return Array.from(set);
}