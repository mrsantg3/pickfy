import {pickWhere} from "../../src";
import {users} from "./fixtures";

describe("pickWhere", () => {
    it("should filter list and pick keys", () => {
        const res = pickWhere(users, ["id", "name"] as const, (u) => u.id > 1);
        expect(res).toEqual([
            { id: 2, name: "Bia" },
            { id: 3, name: "Ana" },
        ]);
    });
    it("should return empty array when no items match", () => {
        const res = pickWhere(users, ["id"] as const, () => false);
        expect(res).toEqual([]);
    });

    it("should allow picking no keys while filtering", () => {
        const res = pickWhere(users, [] as const, (u) => u.id === 1);
        expect(res).toEqual([{}]);
    });
});
