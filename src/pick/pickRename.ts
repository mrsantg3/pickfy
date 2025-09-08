import {PickRenameResult, RenameMap} from "../types";

/** pickRename(obj, { newKey: "oldKey" }) */
export function pickRename<T extends object, R extends RenameMap<T>>(
    obj: T,
    map: R
): PickRenameResult<T, R> {
    const out = {} as PickRenameResult<T, R>;
    for (const newKey in map) {
        const oldKey = map[newKey];
        (out as any)[newKey] = (obj as any)[oldKey];
    }
    return out;
}