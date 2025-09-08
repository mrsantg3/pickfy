import { pick } from "../../src";

type User = {
    id: number;
    name: string;
    email: string | null | undefined;
    profile: { city: string; age: number; tags?: string[] | null };
};

const user: User = {
    id: 1,
    name: "Ana",
    email: "a@x.com",
    profile: { city: "SP", age: 30, tags: ["dev", "music"] },
};

describe("pick", () => {
    it("should pick listed keys", () => {
        expect(pick(user, ["id", "name"] as const)).toEqual({ id: 1, name: "Ana" });
    });

    it("should ignore keys that do not exist (runtime)", () => {
        const result = pick(user as any, ["id", "unknownKey"] as any);
        expect(result).toEqual({ id: 1 });
    });

    it("should return an empty object when keys array is empty", () => {
        expect(pick(user, [] as const)).toEqual({});
    });

    it("should not modify the original object", () => {
        const snapshot = JSON.parse(JSON.stringify(user));
        pick(user, ["id"] as const);
        expect(user).toEqual(snapshot);
    });

    it("should keep undefined values if present on the object", () => {
        const u2: User = { ...user, email: undefined };
        expect(pick(u2, ["email"] as const)).toEqual({ email: undefined });
    });

    it("should return single key even if duplicated in keys list", () => {
        const result = pick(user as any, ["id", "id"] as any);
        expect(result).toEqual({ id: 1 });
    });

    it("should ignore inherited (prototype) properties", () => {
        const proto = { protoProp: 123 };
        const obj = Object.create(proto);
        obj.id = 10;
        obj.name = "Proto";

        const res = pick(obj, ["protoProp", "id"] as any);
        expect(res).toEqual({ id: 10 });
        expect("protoProp" in res).toBe(false);
    });

    it("should preserve reference for picked object values (no deep clone)", () => {
        const out = pick(user, ["profile"] as const);
        expect(out.profile).toBe(user.profile);
    });

    it("should work with a single key", () => {
        expect(pick(user, ["id"] as const)).toEqual({ id: 1 });
    });

    it("should pick nested object key as-is when specified at root", () => {
        const res = pick(user, ["profile"] as const);
        expect(res).toEqual({ profile: user.profile });
    });

    it("should handle large key lists gracefully", () => {
        const bigKeys = ["id", "name", "email", "profile"] as const;
        expect(pick(user, bigKeys)).toEqual({
            id: 1,
            name: "Ana",
            email: "a@x.com",
            profile: user.profile,
        });
    });

    it("should not add extraneous keys", () => {
        const result = pick(user, ["id"] as const);
        expect(Object.keys(result)).toEqual(["id"]);
    });

    it("should be order-agnostic for keys", () => {
        const a = pick(user as any, ["id", "name"]);
        const b = pick(user as any, ["name", "id"]);
        expect(a).toEqual(b);
    });

    it("should work with readonly arrays of keys (as const)", () => {
        const keys = ["name", "email"] as const;
        const res = pick(user, keys);
        expect(res).toEqual({ name: "Ana", email: "a@x.com" });
    });

    it("should include non-enumerable own properties", () => {
        const obj = { id: 1 } as any;
        Object.defineProperty(obj, "secret", {
            value: 42,
            enumerable: false,
            configurable: true,
            writable: true,
        });
        const res = pick(obj, ["secret"] as any);
        expect(res).toEqual({ secret: 42 });
    });

    it("should not throw on empty object", () => {
        expect(pick({}, [] as const)).toEqual({});
    });

    it("should pick symbol keys when provided", () => {
        const sym = Symbol("s");
        const obj: Record<string | symbol, number> = { a: 1 };
        obj[sym] = 2;
        const res = pick(obj as any, [sym] as any);
        expect((res as any)[sym]).toBe(2);
    });
});
