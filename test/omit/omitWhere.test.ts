import {omitWhere} from "../../src";

describe("omitWhere", () => {
    it("should omit keys based on predicate", () => {
        const obj = { a: 1, b: 2, c: 3 };
        const res = omitWhere(obj, (_k, v) => v % 2 === 0);
        expect(res).toEqual({ a: 1, c: 3 });
    });
  
    it("should return same object when predicate never matches", () => {
        const obj = { a: 1, b: 2 };
        expect(omitWhere(obj, () => false)).toEqual(obj);
    });


    it("should provide key and value to predicate", () => {
        const seen: Array<string> = [];
        const obj = { a: 1, b: 2 };
        omitWhere(obj, (k) => {
            seen.push(k);
            return false;
        });
        expect(seen.sort()).toEqual(["a", "b"]);
    });

});
