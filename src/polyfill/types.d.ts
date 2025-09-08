/* eslint-disable @typescript-eslint/no-empty-object-type */
type IterableIterator<T> = Iterator<T>;
type Generator<T = unknown, TReturn = any, TNext = unknown> = Iterator<T, TReturn, TNext>;

// Object polyfills (tipos)
interface ObjectConstructor {
    entries<T>(o: { [s: string]: T } | ArrayLike<T>): [string, T][];
    values<T>(o: { [s: string]: T } | ArrayLike<T>): T[];
    fromEntries<T = any>(entries: Iterable<[PropertyKey, T]>): { [k: string]: T };
    hasOwn?(obj: object, key: PropertyKey): boolean; // ES2022
}

// Array polyfills (tipos)
interface Array<T> {
    flat<U>(this: any[], depth?: number): U[];
    flatMap<U>(callback: (value: T, index: number, array: T[]) => U): U[];
}

// String polyfills (tipos)
interface String {
    replaceAll(search: string | RegExp, replacement: string): string;
}

// globalThis + structuredClone
declare const globalThis: any;
declare function structuredClone<T>(value: T): T;

// Promise.allSettled
interface PromiseConstructor {
    allSettled<T>(values: Iterable<T | PromiseLike<T>>): Promise<
        Array<{ status: "fulfilled"; value: T } | { status: "rejected"; reason: any }>
    >;
}
