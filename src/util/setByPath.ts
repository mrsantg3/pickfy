import {isObject} from "./isObject";

export const setByPath = (target: Record<string, any>, path: string, value: unknown, sep = ".") => {
    const parts = path.split(sep);
    let cur = target;
    for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        if (!isObject(cur[p])) cur[p] = {};
        cur = cur[p] as Record<string, any>;
    }
    cur[parts[parts.length - 1]] = value;
};