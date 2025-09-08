import {hasOwn} from "../../src/util/hasOwn";

describe("hasOwn", () => {
    it("should detect own properties only", () => {
        const proto = { proto: 1 };
        const obj = Object.create(proto);
        obj.id = 10;
        expect(hasOwn(obj, "id")).toBe(true);
        expect(hasOwn(obj, "proto")).toBe(false);
        expect(hasOwn(obj, "missing")).toBe(false);
    });

    it("should detect symbol properties", () => {
        const sym = Symbol("s");
        const obj: Record<string | symbol, number> = { a: 1 };
        obj[sym] = 2;
        expect(hasOwn(obj, sym)).toBe(true);
        expect(hasOwn(obj, Symbol("s"))).toBe(false);
    });
});
