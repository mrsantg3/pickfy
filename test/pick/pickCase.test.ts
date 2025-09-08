import {pickCase} from "../../src";

type User = {
    id: number;
    name: string;
    email: string | null;
    profile: {
        city: string;
        age: number;
        tags?: string[] | null;
        since?: Date;
        extra?: Record<string, unknown>;
    };
};

const baseDate = new Date("2020-01-01T00:00:00Z");

const user: User = {
    id: 1,
    name: "Ana",
    email: "a@x.com",
    profile: { city: "SP", age: 30, tags: ["dev", "music"], since: baseDate, extra: {} },
};

describe("pickCase", () => {
    it('should flatten deep keys to snake case (e.g., "profile.city" → "profile_city")', () => {
        const out = pickCase(user, "snake");
        expect(out).toMatchObject({
            id: 1,
            name: "Ana",
            email: "a@x.com",
            profile_city: "SP",
            profile_age: 30,
            profile_tags: ["dev", "music"],
            profile_since: baseDate,
            profile_extra: {}, // empty object treated as a leaf
        });
    });

    it('should flatten deep keys to camel case (e.g., "profile.city" → "profileCity")', () => {
        const out = pickCase(user, "camel");
        expect(out).toMatchObject({
            id: 1,
            name: "Ana",
            email: "a@x.com",
            profileCity: "SP",
            profileAge: 30,
            profileTags: ["dev", "music"],
            profileSince: baseDate,
            profileExtra: {},
        });
    });

    it('should flatten deep keys to kebab case (e.g., "profile.city" → "profile-city")', () => {
        const out = pickCase(user, "kebab");
        expect(out).toMatchObject({
            id: 1,
            name: "Ana",
            email: "a@x.com",
            "profile-city": "SP",
            "profile-age": 30,
            "profile-tags": ["dev", "music"],
            "profile-since": baseDate,
            "profile-extra": {},
        });
    });

    it("should preserve arrays and Date instances as values (no deep descent into arrays)", () => {
        const out = pickCase(user, "snake");
        expect(out.profile_tags).toBe(user.profile.tags);
        expect(out.profile_since).toBe(user.profile.since);
    });

    it("should include null and undefined leaves as-is", () => {
        const u2: User = {
            ...user,
            email: null,
            profile: { ...user.profile, tags: undefined },
        };
        const out = pickCase(u2, "snake");
        expect(out).toMatchObject({
            email: null,
            profile_tags: undefined,
        });
    });

    it("should not mutate the input object", () => {
        const clone = JSON.parse(JSON.stringify(user, (_k, v) => (v instanceof Date ? v.toISOString() : v)));
        void pickCase(user, "snake");
        const after = JSON.parse(JSON.stringify(user, (_k, v) => (v instanceof Date ? v.toISOString() : v)));
        expect(after).toEqual(clone);
    });

    it("should be stable for wide objects and produce only flat keys", () => {
        const wide = {
            a: 1,
            b: "x",
            c: true,
            d: { e: 2, f: { g: 3 } },
        };
        const out = pickCase(wide, "snake");
        expect(Object.keys(out).sort()).toEqual(["a", "b", "c", "d_e", "d_f_g"].sort());
        expect(out).toMatchObject({ a: 1, b: "x", c: true, d_e: 2, d_f_g: 3 });
    });

    it("should handle potential key collisions by last-write-wins", () => {
        const tricky = {
            profile: { city_name: "X", cityName: "Y" },
        };

        const outCamel = pickCase(tricky, "camel");
        expect(Object.keys(outCamel)).toEqual(expect.arrayContaining(["profileCityName"]));
        expect(outCamel.profileCityName).toBe("Y");

        const outSnake = pickCase(tricky, "snake");
        expect(Object.keys(outSnake)).toEqual(expect.arrayContaining(["profile_city_name"]));
        expect(outSnake.profile_city_name).toBe("Y");

        const outKebab = pickCase(tricky, "kebab");
        expect(Object.keys(outKebab)).toEqual(expect.arrayContaining(["profile-city-name"]));
        expect(outKebab["profile-city-name"]).toBe("Y");
    });

    it("should return empty path key for empty input", () => {
        expect(pickCase({}, "snake")).toEqual({ "": {} });
    });

});
