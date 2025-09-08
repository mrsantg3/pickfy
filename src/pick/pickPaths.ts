import {Path, PickPathsResult} from "../types";

import {getByPath} from "../util/getByPath";

/** pickPaths(obj, ["a.b","x.y"]) -> { "a.b":..., "x.y":... }  */
export function pickPaths<T extends object, P extends readonly Path[]>(
    obj: T,
    paths: P
): PickPathsResult<P> {
    const out = {} as PickPathsResult<P>;
    for (const p of paths) (out as any)[p] = getByPath(obj, p);
    return out;
}