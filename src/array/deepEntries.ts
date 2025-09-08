import {isObject} from "../util/isObject";

/** Walk deep entries as [path, value] for primitives/array/leafs */
export function* deepEntries(obj: unknown, prefix = ""): Generator<[string, unknown]> {
    if (!isObject(obj)) {
        yield [prefix || "", obj];
        return;
    }
    const entries = Object.entries(obj);
    if (entries.length === 0) {
        yield [prefix || "", obj];
        return;
    }
    for (const [k, v] of entries) {
        const path = prefix ? `${prefix}.${k}` : k;
        if (isObject(v)) {
            yield* deepEntries(v, path);
        } else {
            yield [path, v];
        }
    }
}
