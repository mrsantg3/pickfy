import {getByPath} from "../../src/util/getByPath";

describe("getByPath", () => {
    const user = { profile: { city: "SP" }, id: 1 };
    it("should return nested value", () => {
        expect(getByPath(user, "profile.city")).toBe("SP");
    });
  
    it("should return undefined for missing path", () => {
        expect(getByPath(user, "profile.age")).toBeUndefined();
    });
  
    it("should return undefined when object is null or undefined", () => {
        expect(getByPath(null as unknown as Record<string, unknown>, "a.b")).toBeUndefined();
    });

    it("should navigate through array indices", () => {
        const obj = { arr: [{ v: 1 }, { v: 2 }] };
        expect(getByPath(obj, "arr.1.v")).toBe(2);
    });
});
