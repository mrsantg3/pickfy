import {CaseStyle} from "../types";
import {toTokenize} from "./toTokenize";
import {toCamel} from "./toCamel";
import {toSnake} from "./toSnake";
import {toKebab} from "./toKebab";

/**
 * Convert dotted paths to a given case style.
 * Example: "profile.cityName" → "profile.city_name" (snake)
 */
export const convertCase = (path: string, style: CaseStyle): string => {
    const tokens = toTokenize(path);

    switch (style) {
        case "camel":
            return toCamel(tokens);
        case "snake":
            return toSnake(tokens);
        case "kebab":
            return toKebab(tokens);
        default:
            return path;
    }
};