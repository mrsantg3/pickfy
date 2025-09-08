import {pickWithDefaults} from "../../src";

describe("pickWithDefaults", () => {
    it("should fill missing keys with defaults", () => {
        const user = { id: 1 };
        const res = pickWithDefaults(user, ["id", "name"] as const, { name: "Unknown" });
        expect(res).toEqual({ id: 1, name: "Unknown" });
    });
    it("should not override existing keys", () => {
        const user = { id: 1, name: "Ana" };
        const res = pickWithDefaults(user, ["id", "name"] as const, { name: "Unknown" });
        expect(res).toEqual({ id: 1, name: "Ana" });
    });
    it("should leave keys undefined when no default provided", () => {
        const user = { id: 1 } as any;
        const res = pickWithDefaults(user, ["name"] as const, {});
        expect(res).toEqual({ name: undefined });
    });

    it("should ignore defaults for keys not requested", () => {
        const user = { id: 1 } as any;
        const res = pickWithDefaults(user, ["id"] as const, { name: "x" } as any);
        expect(res).toEqual({ id: 1 });
    });
});
