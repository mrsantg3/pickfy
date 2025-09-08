import {deepEntries} from "../../src";

/**
 * Helper: collect all yielded entries and sort by path
 * to make expectations deterministic.
 */
function collectSorted(
    obj: unknown,
    prefix?: string
): Array<[string, unknown]> {
    const items = Array.from(deepEntries(obj, prefix)) as Array<[string, unknown]>;
    items.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    return items;
}

describe("deepEntries", () => {
    it("should yield a single entry for a primitive root", () => {
        expect(collectSorted(42)).toEqual([["", 42]]);
        expect(collectSorted("abc")).toEqual([["", "abc"]]);
        expect(collectSorted(true)).toEqual([["", true]]);
        expect(collectSorted(null)).toEqual([["", null]]);
        expect(collectSorted(undefined)).toEqual([["", undefined]]);
    });

    it("should yield a single entry for an empty object", () => {
        expect(collectSorted({})).toEqual([["", {}]]);
    });

    it("should walk nested plain objects and produce dot paths", () => {
        const obj = { a: { b: { c: 1 } }, d: 2 };
        const out = collectSorted(obj);
        expect(out).toEqual([
            ["a.b.c", 1],
            ["d", 2],
        ]);
    });

    it("should treat arrays as leaf values (no descent into arrays)", () => {
        const obj = { a: [1, 2, { x: 3 }], b: "ok" };
        const out = collectSorted(obj);
        // Entire array under key "a" is yielded as a leaf value.
        expect(out).toEqual([
            ["a", [1, 2, { x: 3 }]],
            ["b", "ok"],
        ]);
    });

    it("should handle undefined and null leaves inside nested objects", () => {
        const obj = { x: undefined, y: null, z: { k: undefined, m: 0 } };
        const out = collectSorted(obj);
        expect(out).toEqual([
            ["x", undefined],
            ["y", null],
            ["z.k", undefined],
            ["z.m", 0],
        ]);
    });

    it("should honor the provided prefix", () => {
        const obj = { a: { b: 1 }, c: 2 };
        const out = collectSorted(obj, "root");
        expect(out).toEqual([
            ["root.a.b", 1],
            ["root.c", 2],
        ]);
    });

    it("should not mutate the original input object", () => {
        const obj = { a: { b: { c: 1 } } };
        const snapshot = JSON.parse(JSON.stringify(obj));
        // Iterate fully to ensure no lazy side effects
        void Array.from(deepEntries(obj));
        expect(obj).toEqual(snapshot);
    });

    it("should yield a single leaf when a nested object is empty", () => {
        const obj = { a: {} };
        const out = collectSorted(obj);
        // Contract: an empty object is treated as a leaf at its path.
        expect(out).toEqual([["a", {}]]);
    });

    it("should enumerate all first-level leaves and go deeper when needed", () => {
        const obj = { a: 1, b: "x", c: true, d: { e: 2 } };
        const out = collectSorted(obj);
        expect(out).toEqual([
            ["a", 1],
            ["b", "x"],
            ["c", true],
            ["d.e", 2],
        ]);
    });

    it("should treat functions and Date instances as leaf values", () => {
        const fn = () => 1;
        const dt = new Date("2020-01-01");
        const obj = { fn, dt };
        const out = collectSorted(obj);
        expect(out).toEqual([
            ["dt", dt],
            ["fn", fn],
        ]);
    });
});
