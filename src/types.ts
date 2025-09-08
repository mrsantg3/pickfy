/** Key helpers */
export type Keys<T> = Extract<keyof T, string>;
export type Path = `${string}.${string}` | string;

/** Results */
export type PickResult<T, K extends readonly Keys<T>[]> = Pick<T, K[number]>;
export type OmitResult<T, K extends readonly Keys<T>[]> = Omit<T, K[number]>;
export type PickPathsResult<P extends readonly Path[]> = Record<P[number], unknown>;

/** Rename map: newKey -> oldKey */
export type RenameMap<T> = Record<string, Keys<T>>;
export type PickRenameResult<T, R extends RenameMap<T>> = {
    [P in keyof R]: T[R[P]];
};

/** pickWithDefaults: allows keys outside keyof T (e.g., "nickname") */
export type KeysLoose<T, K extends readonly string[]> = K[number] & string;
export type PickWithDefaultsResult<
    T,
    K extends readonly string[],
    D extends Partial<Record<K[number], unknown>>
> = {
    [P in K[number]]: P extends keyof T ? T[P] : D[P];
};

/** groupByPick result: key -> array of items */
export type Grouped<T> = Record<string, T[]>;

/** pickMap: { outKey: [inKey, transform?] } */
export type TransformFn<V, R = unknown> = (value: V) => R;
export type PickMapSpec<T> = {
    [OutKey: string]: [Keys<T>] | [Keys<T>, TransformFn<any, any>];
};

/** Case styles for pickCase */
export type CaseStyle = "camel" | "snake" | "kebab";

/** Utility to expose types to consumers */
export type {
    PickResult as TPickResult,
    OmitResult as TOmitResult,
    PickRenameResult as TPickRenameResult,
};
