import {pickIf} from "./pickIf";

/** pickNotNullish(obj) -> remove null/undefined */
export function pickNotNullish<T extends object>(obj: T): Partial<T> {
    return pickIf(obj, (v) => v != null);
}