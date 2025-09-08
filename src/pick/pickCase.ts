import {CaseStyle} from "../types";
import {deepEntries} from "../array/deepEntries";
import {convertCase} from "../converter/convertCase";

/**
 * pickCase(obj, "snake" | "camel" | "kebab")
 * Produz um objeto FLAT onde as chaves profundas são convertidas e "achatadas".
 * Ex.: { profile: { city: "SP", age: 30 } } -> snake => { profile_city: "SP", profile_age: 30 }
 */
export function pickCase<T extends object>(
    obj: T,
    style: CaseStyle
): Record<string, unknown> {
    const out: Record<string, unknown> = {};
    for (const [path, value] of deepEntries(obj)) {
        const cased = convertCase(path, style);
        out[cased] = value;
    }
    return out;
}