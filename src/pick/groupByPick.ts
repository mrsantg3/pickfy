import {Grouped, Path} from "../types";

import {getByPath} from "../util/getByPath";

/** groupByPick(list, "profile.city") -> { city: [...] } */
export function groupByPick<T extends object>(
    list: readonly T[],
    path: Path
): Grouped<T> {
    const groups: Grouped<T> = {};
    for (const item of list) {
        const val = getByPath(item, path);
        const k = String(val);
        (groups[k] ||= []).push(item as T);
    }
    return groups;
}