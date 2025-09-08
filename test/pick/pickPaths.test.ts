import {pickPaths} from "../../src";
import {users} from "./fixtures";

describe("pickPaths", () => {
    it("should return object keyed by given paths", () => {
        const user = users[0];
        const out = pickPaths(user, ["profile.city", "profile.age"] as const);
        expect(out).toEqual({ "profile.city": "SP", "profile.age": 30 });
    });
    it("should return undefined for nonexistent paths", () => {
        const user = users[0];
        expect(pickPaths(user, ["profile.zip"] as const)).toEqual({ "profile.zip": undefined });
    });

    it("should handle multiple paths and not mutate original", () => {
        const user = users[0];
        const snap = JSON.parse(JSON.stringify(user));
        const out = pickPaths(user, ["id", "profile.city"] as const);
        expect(out).toEqual({ id: 1, "profile.city": "SP" });
        expect(user).toEqual(snap);
    });
});
