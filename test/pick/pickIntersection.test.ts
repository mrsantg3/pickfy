import {pickIntersection} from "../../src";

describe("pickIntersection", () => {
    it("should collect values for keys across list", () => {
        const list = [{ id: 1, name: "A" }, { id: 2, name: "B" }, { id: 3 }];
        const res = pickIntersection(list, ["id", "name"] as const);
        expect(res).toEqual({ id: [1, 2, 3], name: ["A", "B"] });
    });
    it("should return empty arrays for each key when list is empty", () => {
        const res = pickIntersection([], ["id", "name"] as const);
        expect(res).toEqual({ id: [], name: [] });
    });


    it("should return empty object when no keys provided", () => {
        const list = [{ id: 1 }];
        const res = pickIntersection(list, [] as const);
        expect(res).toEqual({});
    });
});
