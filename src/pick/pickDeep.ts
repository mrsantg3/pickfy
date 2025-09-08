import {getByPath} from "../util/getByPath";
import {Path} from "../types";
import {setByPath} from "../util/setByPath";

/** pickDeep(obj, ["a.b","x.y"]) -> { a: { b: ... }, x: { y: ... } } */
export function pickDeep<T extends object, P extends readonly Path[]>(
    obj: T,
    paths: P
): Record<string, unknown> {
    const out: Record<string, unknown> = {};
    for (const p of paths) {
        const val = getByPath(obj, p);
        if (val !== undefined) setByPath(out, p, val);
    }
    return out;
}