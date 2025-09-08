import {pickMap} from "../../src";

describe("pickMap", () => {
    it("should map keys and apply transforms", () => {
        const user = { id: 1, name: "Ana" };
        const spec = {
            uid: ["id", (v: number) => `#${v}`] as ["id", (v: number) => string],
            name: ["name"] as ["name"],
        };
        const res = pickMap(user, spec);
        expect(res).toEqual({ uid: "#1", name: "Ana" });
    });
    it("should map keys without transform when only source key provided", () => {
        const user = { id: 1, name: "Ana" };
        const res = pickMap(user, { uid: ["id"] as ["id"] });
        expect(res).toEqual({ uid: 1 });
    });
    it("should set undefined when mapped key does not exist", () => {
        const user = { id: 1 } as any;
        const res = pickMap(user, { name: ["name"] as ["name"] });
        expect(res).toEqual({ name: undefined });
    });

    it("should allow transforms to handle missing values", () => {
        const user = { id: 1 } as any;
        const res = pickMap(user, {
            name: ["name", (v: string | undefined) => v ?? "anon"] as ["name", (v: string | undefined) => string],
        });
        expect(res).toEqual({ name: "anon" });
    });
});
