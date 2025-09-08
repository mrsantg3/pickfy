import {pickUnique} from "../../src";
import {users} from "./fixtures";

describe("pickUnique", () => {
    it("should return unique values for key", () => {
        const res = pickUnique(users, "name");
        expect(res.sort()).toEqual(["Ana", "Bia"].sort());
    });
    it("should return empty array for empty list", () => {
        expect(pickUnique([], "name")).toEqual([]);
    });

    it("should include undefined once when key missing", () => {
        const list: Array<{ name?: string }> = [{}, { name: "Ana" }];
        const res = pickUnique(list, "name");
        expect(res.sort()).toEqual(["Ana", undefined].sort());
    });
});
