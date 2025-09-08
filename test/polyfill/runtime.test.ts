import "../../src/polyfill/runtime";

describe("polyfill runtime", () => {
    it("provides Object.entries and Object.values", () => {
        const obj = { a: 1, b: 2 };
        expect(Object.entries(obj)).toEqual([["a", 1], ["b", 2]]);
        expect(Object.values(obj)).toEqual([1, 2]);
    });

    it("provides Object.fromEntries", () => {
        const entries: Array<[string, number]> = [["a", 1], ["b", 2]];
        expect(Object.fromEntries(entries)).toEqual({ a: 1, b: 2 });
    });

    it("provides Object.hasOwn", () => {
        const proto = { inherited: true };
        const obj = Object.create(proto);
        obj.own = 1;
        expect((Object.hasOwn as any)(obj, "own")).toBe(true);
        expect((Object.hasOwn as any)(obj, "inherited")).toBe(false);
    });

    it("provides Array.prototype.flat and flatMap", () => {
        expect([1, [2, [3]]].flat(2)).toEqual([1, 2, 3]);
        const mapped = [1, 2, 3].flatMap((n) => [n, n * 2]);
        expect(mapped).toEqual([1, 2, 2, 4, 3, 6]);
    });

    it("provides String.prototype.replaceAll", () => {
        expect("a-b-c".replaceAll("-", ":")).toBe("a:b:c");
        expect("aAa".replaceAll(/a/gi, "x")).toBe("xxx");
    });

    it("exposes globalThis", () => {
        expect(globalThis).toBeDefined();
    });

    it("provides structuredClone", () => {
        const original = { a: 1, b: { c: 2 } };
        const clone = structuredClone(original) as typeof original;
        expect(clone).toEqual(original);
        expect(clone).not.toBe(original);
    });

    it("provides Promise.allSettled", async () => {
        const results = await Promise.allSettled([
            Promise.resolve(1),
            Promise.reject("err"),
        ]);
        expect(results).toEqual([
            { status: "fulfilled", value: 1 },
            { status: "rejected", reason: "err" },
        ]);
    });

    it("structuredClone should handle arrays and Dates", () => {
        const arr = [1, new Date("2020-01-01"), { a: 1 }];
        const clone = structuredClone(arr) as typeof arr;
        expect(clone).toEqual(arr);
        expect(clone[1]).not.toBe(arr[1]);
        expect(clone[2]).not.toBe(arr[2]);
    });
});
