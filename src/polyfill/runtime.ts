
// ---------- Object.entries / Object.values ----------
if (!Object.entries) {
    Object.entries = function (obj: any): [string, any][] {
        const out: [string, any][] = [];
        for (const k in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, k)) out.push([k, obj[k]]);
        }
        return out;
    };
}

if (!Object.values) {
    Object.values = function (obj: any): any[] {
        const out: any[] = [];
        for (const k in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, k)) out.push(obj[k]);
        }
        return out;
    };
}

// ---------- Object.fromEntries ----------
if (!Object.fromEntries) {
    Object.fromEntries = function (entries: Iterable<[PropertyKey, any]>): any {
        const obj: any = {};
        for (const [k, v] of entries as any) obj[k as any] = v;
        return obj;
    };
}

// ---------- Object.hasOwn (ES2022) ----------
if (!(Object as any).hasOwn) {
    (Object as any).hasOwn = function (obj: object, key: PropertyKey): boolean {
        return Object.prototype.hasOwnProperty.call(obj, key);
    };
}

// ---------- Array.prototype.flat / flatMap ----------
if (!Array.prototype.flat) {
    Array.prototype.flat = function <T>(this: T[], depth = 1): any[] {
        const d = Math.floor(depth) || 0;
        if (d <= 0) return this.slice();
        return this.reduce((acc: any[], cur: any) => {
            if (Array.isArray(cur)) acc.push(...(cur as any).flat(d - 1));
            else acc.push(cur);
            return acc;
        }, []);
    };
}

if (!Array.prototype.flatMap) {
    Array.prototype.flatMap = function <T, R>(this: T[], fn: (v: T, i: number, a: T[]) => R): any[] {
        return (this.map(fn) as any).flat();
    };
}

// ---------- String.prototype.replaceAll ----------
if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (this: string, search: string | RegExp, replacement: string) {
        if (search instanceof RegExp) {
            if (!search.global) search = new RegExp(search.source, search.flags + "g");
            return this.replace(search, replacement);
        }
        return this.split(String(search)).join(replacement);
    };
}

// ---------- globalThis ----------
(function ensureGlobalThis() {
    if (typeof globalThis === "object") return;
    (Function("return this")() as any).globalThis = Function("return this")();
})();

// ---------- structuredClone (degrada para JSON) ----------
if (typeof (globalThis as any).structuredClone !== "function") {
    (globalThis as any).structuredClone = function (value: any) {
        return JSON.parse(JSON.stringify(value));
    };
}

// ---------- Promise.allSettled ----------
if (!Promise.allSettled) {
    Promise.allSettled = function <T>(promises: Iterable<Promise<T>>): Promise<
        Array<{ status: "fulfilled"; value: T } | { status: "rejected"; reason: any }>
    > {
        return Promise.all(
            Array.from(promises, (p) =>
                Promise.resolve(p).then(
                    (value) => ({ status: "fulfilled", value } as const),
                    (reason) => ({ status: "rejected", reason } as const)
                )
            )
        );
    };
}
