import {toKebab} from "../../src/converter/toKebab";

describe("toKebab", () => {
    it("should return empty string for empty tokens", () => {
        expect(toKebab([])).toBe("");
    });

    it("should lowercase a single token", () => {
        expect(toKebab(["USER"])).toBe("user");
        expect(toKebab(["User"])).toBe("user");
        expect(toKebab(["user"])).toBe("user");
    });

    it("should join two tokens with a hyphen", () => {
        expect(toKebab(["first", "name"])).toBe("first-name");
        expect(toKebab(["First", "NAME"])).toBe("first-name");
    });

    it("should join multiple tokens with hyphens", () => {
        expect(toKebab(["user", "profile", "main", "city"])).toBe("user-profile-main-city");
        expect(toKebab(["USER", "PROFILE", "MAIN", "CITY"])).toBe("user-profile-main-city");
    });

    it("should handle acronyms correctly", () => {
        expect(toKebab(["API", "Response"])).toBe("api-response");
        expect(toKebab(["API", "ID"])).toBe("api-id");
        expect(toKebab(["api", "ID"])).toBe("api-id");
    });

    it("should handle numeric tokens", () => {
        expect(toKebab(["user", "2", "fa"])).toBe("user-2-fa");
        expect(toKebab(["ISO", "9001", "Cert"])).toBe("iso-9001-cert");
    });

    it("should always produce lowercase output", () => {
        expect(toKebab(["Mixed", "CASE", "Tokens"])).toBe("mixed-case-tokens");
    });

    it("should not insert extra hyphens", () => {
        expect(toKebab(["user", "name"])).toBe("user-name");
        expect(toKebab(["user", "name", "id"])).toBe("user-name-id");
    });

    it("should be idempotent when tokens are already lowercase", () => {
        expect(toKebab(["user", "name"])).toBe("user-name");
        expect(toKebab(["already", "kebab", "case"])).toBe("already-kebab-case");
    });

    it("should handle leading numeric tokens", () => {
        expect(toKebab(["123", "abc"])).toBe("123-abc");
    });
});
