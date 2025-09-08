import {toCamel} from "../../src/converter/toCamel";

describe("toCamel", () => {
    it("should return empty string for empty tokens", () => {
        expect(toCamel([])).toBe("");
    });

    it("should return the lowercased token for a single token", () => {
        expect(toCamel(["USER"])).toBe("user");
        expect(toCamel(["user"])).toBe("user");
        expect(toCamel(["User"])).toBe("user");
    });

    it("should camelize two tokens", () => {
        expect(toCamel(["first", "name"])).toBe("firstName");
        expect(toCamel(["FIRST", "NAME"])).toBe("firstName");
        expect(toCamel(["First", "NAME"])).toBe("firstName");
    });

    it("should camelize multiple tokens", () => {
        expect(toCamel(["user", "profile", "main", "city"])).toBe("userProfileMainCity");
        expect(toCamel(["USER", "PROFILE", "MAIN", "CITY"])).toBe("userProfileMainCity");
    });

    it("should keep acronyms as capitalized words after the head", () => {
        // Head becomes lowercase, following tokens capitalized with the rest lowercased
        expect(toCamel(["api", "response"])).toBe("apiResponse");
        expect(toCamel(["API", "Response"])).toBe("apiResponse");
        expect(toCamel(["api", "ID"])).toBe("apiId");
        expect(toCamel(["API", "ID"])).toBe("apiId");
    });

    it("should handle numeric tokens", () => {
        expect(toCamel(["user", "2", "fa"])).toBe("user2Fa");
        expect(toCamel(["v2", "beta"])).toBe("v2Beta");
        expect(toCamel(["ISO", "9001", "cert"])).toBe("iso9001Cert");
    });

    it("should handle mixed punctuation already split by tokenizer", () => {
        // Assuming tokenizer already split by delimiters, we just assert join behavior
        expect(toCamel(["first", "name"])).toBe("firstName"); // from "first-name" / "first_name"
        expect(toCamel(["profile", "city", "name"])).toBe("profileCityName"); // from "profile.cityName"
    });

    it("should not insert spaces or delimiters between tokens", () => {
        expect(toCamel(["user", "name"])).toBe("userName");
        expect(toCamel(["user", "name", "id"])).toBe("userNameId");
    });

    it("should be idempotent when tokens are already camel-cased segments", () => {
        expect(toCamel(["user"])).toBe("user");
        expect(toCamel(["user", "Name"])).toBe("userName");
        expect(toCamel(["user", "Profile", "Main", "City"])).toBe("userProfileMainCity");
    });

    it("should handle leading numeric tokens", () => {
        expect(toCamel(["123", "abc"])).toBe("123Abc");
    });
});
