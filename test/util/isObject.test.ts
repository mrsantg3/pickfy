import {isObject} from "../../src/util/isObject";

describe("isObject", () => {
    it("should detect plain objects only", () => {
        expect(isObject({})).toBe(true);
        expect(isObject([])).toBe(false);
        expect(isObject(null)).toBe(false);
        expect(isObject(5)).toBe(false);
        expect(isObject(new Date())).toBe(true);
    });
});
