import {omit} from "../../src";

describe("omit", () => {
    it("should remove listed keys", () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(omit(obj, ["b"] as const)).toEqual({ a: 1, c: 3 });
    });
  
  it("should ignore keys that do not exist", () => {
        const obj = { a: 1 };
        expect(omit(obj, ["b"] as any)).toEqual({ a: 1 });
    });
  
    it("should remove multiple keys", () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(omit(obj, ["a", "c"] as const)).toEqual({ b: 2 });
    });


    it("should not mutate the original object", () => {
        const obj = { a: 1, b: 2 };
        const snap = { ...obj };
        omit(obj, ["a"] as const);
        expect(obj).toEqual(snap);
    });

    it("should return same object when keys list is empty", () => {
        const obj = { a: 1 };
        expect(omit(obj, [] as const)).toEqual(obj);
    });

});
