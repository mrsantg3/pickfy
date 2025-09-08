import {setByPath} from "../../src/util/setByPath";

describe("setByPath", () => {
    it("should set nested value using dot path", () => {
        const obj: Record<string, unknown> = {};
        setByPath(obj, "a.b.c", 1);
        expect(obj).toEqual({ a: { b: { c: 1 } } });
    });
    it("should support custom separator", () => {
        const obj: Record<string, unknown> = {};
        setByPath(obj, "x/y", 2, "/");
        expect(obj).toEqual({ x: { y: 2 } });
    });

    it("should override existing values", () => {
        const obj: Record<string, unknown> = { a: { b: 1 } };
        setByPath(obj, "a.b", 2);
        expect(obj).toEqual({ a: { b: 2 } });
    });
});
