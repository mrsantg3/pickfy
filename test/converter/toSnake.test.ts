import {toSnake} from "../../src/converter/toSnake";

describe("toSnake", () => {
    it("should return empty string for empty tokens", () => {
        expect(toSnake([])).toBe("");
    });

    it("should lowercase a single token", () => {
        expect(toSnake(["USER"])).toBe("user");
        expect(toSnake(["User"])).toBe("user");
        expect(toSnake(["user"])).toBe("user");
    });

    it("should join two tokens with underscore", () => {
        expect(toSnake(["first", "name"])).toBe("first_name");
        expect(toSnake(["First", "NAME"])).toBe("first_name");
    });

    it("should join multiple tokens with underscores", () => {
        expect(toSnake(["user", "profile", "main", "city"])).toBe("user_profile_main_city");
        expect(toSnake(["USER", "PROFILE", "MAIN", "CITY"])).toBe("user_profile_main_city");
    });

    it("should handle acronyms correctly", () => {
        expect(toSnake(["API", "Response"])).toBe("api_response");
        expect(toSnake(["API", "ID"])).toBe("api_id");
        expect(toSnake(["api", "ID"])).toBe("api_id");
    });

    it("should handle numeric tokens", () => {
        expect(toSnake(["user", "2", "fa"])).toBe("user_2_fa");
        expect(toSnake(["ISO", "9001", "Cert"])).toBe("iso_9001_cert");
    });

    it("should always produce lowercase output", () => {
        expect(toSnake(["Mixed", "CASE", "Tokens"])).toBe("mixed_case_tokens");
    });

    it("should not insert extra underscores", () => {
        expect(toSnake(["user", "name"])).toBe("user_name");
        expect(toSnake(["user", "name", "id"])).toBe("user_name_id");
    });

    it("should be idempotent when tokens are already lowercase", () => {
        expect(toSnake(["user", "name"])).toBe("user_name");
        expect(toSnake(["already", "snake", "case"])).toBe("already_snake_case");
    });

    it("should handle leading numeric tokens", () => {
        expect(toSnake(["123", "abc"])).toBe("123_abc");
    });
});
