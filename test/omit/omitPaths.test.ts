import {omitPaths} from "../../src";

describe("omitPaths", () => {
    it("should remove nested properties without mutating original", () => {
        const obj = { a: { b: 1, c: 2 }, d: 3 };
        const snapshot = JSON.parse(JSON.stringify(obj));
        const res = omitPaths(obj, ["a.b"]);
        expect(res).toEqual({ a: { c: 2 }, d: 3 });
        expect(obj).toEqual(snapshot);
    });
    it("should ignore paths that do not exist", () => {
        const obj = { a: { b: 1 } };
        const res = omitPaths(obj, ["a.x", "c"]);
        expect(res).toEqual({ a: { b: 1 } });
    });
    it("should remove multiple paths", () => {
        const obj = { a: { b: 1, c: 2 }, d: 3 };
        const res = omitPaths(obj, ["a.b", "d"]);
        expect(res).toEqual({ a: { c: 2 } });
    });


    it("should remove root-level path", () => {
        const obj = { a: 1, b: 2 };
        const res = omitPaths(obj, ["a"]);
        expect(res).toEqual({ b: 2 });
    });

});
