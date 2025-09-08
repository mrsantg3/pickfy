import {pickIf} from "../../src";

describe("pickIf", () => {
    it("should pick keys based on predicate", () => {
        const obj = { a: 1, b: 2, c: 3 };
        const res = pickIf(obj, (v) => v > 1);
        expect(res).toEqual({ b: 2, c: 3 });
    });
    it("should return empty object when predicate never matches", () => {
        const obj = { a: 1, b: 2 };
        expect(pickIf(obj, () => false)).toEqual({});
    });


    it("should provide key to predicate", () => {
        const obj = { a: 1, b: 2 };
        const keys: string[] = [];
        pickIf(obj, (_v, k) => {
            keys.push(k);
            return true;
        });
        expect(keys.sort()).toEqual(["a", "b"]);
    });

});
