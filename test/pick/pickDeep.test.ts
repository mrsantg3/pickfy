import {pickDeep} from "../../src";
import {users} from "./fixtures";

describe("pickDeep", () => {
    it("should build nested object with provided paths", () => {
        const user = users[0];
        const out = pickDeep(user, ["profile.city", "profile.age"] as const);
        expect(out).toEqual({ profile: { city: "SP", age: 30 } });
    });
    it("should ignore paths that resolve to undefined", () => {
        const user = users[0];
        const out = pickDeep(user, ["profile.city", "unknown"] as const);
        expect(out).toEqual({ profile: { city: "SP" } });
    });
    it("should return empty object when no paths are provided", () => {
        const user = users[0];
        expect(pickDeep(user, [] as const)).toEqual({});
    });


    it("should handle paths that include array indices", () => {
        const user = {
            ...users[0],
            profile: { ...users[0].profile, tags: ["dev", "music"] },
        } as any;
        const out = pickDeep(user, ["profile.tags.0"] as const);
        expect(out).toEqual({ profile: { tags: { 0: "dev" } } });
    });
});
