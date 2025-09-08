import {Keys, PickMapSpec, TransformFn} from "../types";

/** pickMap(user, { uid: ["id", v => `#${v}`] }) */
export function pickMap<T extends object, Spec extends PickMapSpec<T>>(
    obj: T,
    spec: Spec
): {
    [K in keyof Spec]: Spec[K] extends [infer InKey, infer F]
        ? F extends TransformFn<any, infer R>
            ? R
            : InKey extends Keys<T>
                ? T[InKey]
                : unknown
        : Spec[K] extends [infer InKey]
            ? InKey extends Keys<T>
                ? T[InKey]
                : unknown
            : unknown;
} {
    const out: Record<string, unknown> = {};
    for (const outKey in spec) {
        const [inKey, transform] = spec[outKey] as [Keys<T>, TransformFn<any, any>?];
        const raw = (obj as any)[inKey];
        out[outKey] = typeof transform === "function" ? transform(raw) : raw;
    }
    return out as any;
}