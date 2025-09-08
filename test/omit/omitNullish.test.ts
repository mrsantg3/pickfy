import {omitNullish} from "../../src";

describe("omitNullish", () => {
    it("should remove null and undefined values", () => {
        const obj = { a: 1, b: null, c: undefined, d: 0 };
        expect(omitNullish(obj)).toEqual({ a: 1, d: 0 });
    });
    it("should keep falsy but defined values", () => {
        const obj = { a: 0, b: false, c: "" };
        expect(omitNullish(obj)).toEqual(obj);
    });


    it("should not mutate original object", () => {
        const obj = { a: 1, b: null };
        const snap = { ...obj };
        omitNullish(obj);
        expect(obj).toEqual(snap);
    });

});
