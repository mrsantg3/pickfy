import {groupByPick} from "../../src";
import {users} from "./fixtures";

describe("groupByPick", () => {
    it("should group items by path value", () => {
        const res = groupByPick(users, "profile.city");
        expect(Object.keys(res)).toEqual(expect.arrayContaining(["SP", "RJ"]));
        expect(res["SP"].length).toBe(2);
        expect(res["RJ"][0].name).toBe("Bia");
    });
    it("should group items with missing path under 'undefined'", () => {
        const list = [{ id: 1 }, { id: 2, profile: { city: "SP" } }];
        const res = groupByPick(list as any, "profile.city") as any;
        expect(res.undefined.length).toBe(1);
        expect(res.SP[0].id).toBe(2);
    });

    it("should group items by numeric values as string keys", () => {
        const res = groupByPick(users, "id") as any;
        expect(res["1"][0].name).toBe("Ana");
        expect(Object.keys(res)).toEqual(expect.arrayContaining(["1", "2", "3"]));
    });
});
