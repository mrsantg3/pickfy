import {pickDistinct} from "../../src";
import {users} from "./fixtures";

describe("pickDistinct", () => {
    it("should return distinct values from path", () => {
        const res = pickDistinct(users, "profile.city");
        expect(res.sort()).toEqual(["SP", "RJ"].sort());
    });
  
    it("should return empty array for empty list", () => {
        expect(pickDistinct([], "profile.city")).toEqual([]);
    });


    it("should include 'undefined' when path is missing", () => {
        const list = [{}, { profile: { city: "SP" } }];
        const res = pickDistinct(list as any, "profile.city");
        expect(res.sort()).toEqual(["SP", "undefined"].sort());
    });

});
