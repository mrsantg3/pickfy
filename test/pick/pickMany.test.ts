import {pickMany} from "../../src";
import {users} from "./fixtures";

describe("pickMany", () => {
    it("should pick keys from each list item", () => {
        const res = pickMany(users, ["id", "name"] as const);
        expect(res).toEqual([
            { id: 1, name: "Ana" },
            { id: 2, name: "Bia" },
            { id: 3, name: "Ana" },
        ]);
    });
    it("should return empty array when list is empty", () => {
        expect(pickMany([], ["id"] as const)).toEqual([]);
    });
    it("should ignore keys missing on items", () => {
        const res = pickMany(users, ["id", "missing"] as any);
        expect(res).toEqual([
            { id: 1 },
            { id: 2 },
            { id: 3 },
        ]);
    });

    it("should return empty objects when keys list is empty", () => {
        const res = pickMany(users, [] as const);
        expect(res).toEqual([{}, {}, {}]);
    });
});
