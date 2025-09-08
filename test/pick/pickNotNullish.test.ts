import {pickNotNullish} from "../../src";

describe("pickNotNullish", () => {
    it("should remove nullish values", () => {
        const obj = { a: 1, b: null, c: undefined };
        expect(pickNotNullish(obj)).toEqual({ a: 1 });
    });
    it("should retain falsy non-nullish values", () => {
        const obj = { a: 0, b: false, c: "" };
        expect(pickNotNullish(obj)).toEqual(obj);
    });

    it("should not mutate the original object", () => {
        const obj = { a: 1, b: null };
        const snapshot = { ...obj };
        pickNotNullish(obj);
        expect(obj).toEqual(snapshot);
    });
});
