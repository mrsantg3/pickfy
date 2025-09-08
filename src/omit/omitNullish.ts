import {omitWhere} from "./omitWhere";

/** omitNullish(obj) -> remove null/undefined */
export function omitNullish<T extends object>(obj: T): Partial<T> {
    return omitWhere(obj, (_k, v) => v == null);
}