import {isObject} from "../util/isObject";
import {Path} from "../types";

/** omitPaths(obj, ["a.b"]) */
export function omitPaths<T extends object>(obj: T, paths: readonly Path[]): T {
    const clone: any = structuredClone ? structuredClone(obj) : JSON.parse(JSON.stringify(obj));
    for (const p of paths) {
        const parts = p.split(".");
        let cur: any = clone;
        for (let i = 0; i < parts.length - 1; i++) {
            cur = cur?.[parts[i]];
            if (!isObject(cur)) break;
        }
        if (isObject(cur)) delete cur[parts[parts.length - 1]];
    }
    return clone;
}