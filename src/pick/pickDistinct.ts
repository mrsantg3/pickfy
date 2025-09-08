import {getByPath} from "../util/getByPath";
import {Path} from "../types";

/** pickDistinct(list, "profile.city") -> ["New Iork","New Jersey"] */
export function pickDistinct<T extends object>(
    list: readonly T[],
    path: Path
): string[] {
    const s = new Set<string>();
    for (const item of list) s.add(String(getByPath(item, path)));
    return Array.from(s);
}