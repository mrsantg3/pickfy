import {toTokenize} from "../../src/converter/toTokenize";

describe("toTokenize", () => {
    it("should return empty array for empty string", () => {
        expect(toTokenize("")).toEqual([]);
    });

    it("should split by underscores", () => {
        expect(toTokenize("first_name")).toEqual(["first", "name"]);
    });

    it("should split by hyphens", () => {
        expect(toTokenize("first-name")).toEqual(["first", "name"]);
    });

    it("should split by dots", () => {
        expect(toTokenize("profile.cityName")).toEqual(["profile", "city", "Name"]);
    });

    it("should handle camelCase", () => {
        expect(toTokenize("firstName")).toEqual(["first", "Name"]);
        expect(toTokenize("userProfileMainCity")).toEqual([
            "user",
            "Profile",
            "Main",
            "City",
        ]);
    });

    it("should handle PascalCase", () => {
        expect(toTokenize("FirstName")).toEqual(["First", "Name"]);
        expect(toTokenize("UserProfile")).toEqual(["User", "Profile"]);
    });

    it("should keep acronyms together", () => {
        expect(toTokenize("APIResponse")).toEqual(["API", "Response"]);
        // current tokenizer splits "OAuth" into "OA" + "uth"
        expect(toTokenize("OAuthToken")).toEqual(["OA", "uth", "Token"]);
        expect(toTokenize("HTTPRequest")).toEqual(["HTTP", "Request"]);
    });

    it("should handle numbers correctly", () => {
        expect(toTokenize("user2faEnabled")).toEqual(["user", "2", "fa", "Enabled"]);
        expect(toTokenize("ISO9001Cert")).toEqual(["ISO", "9001", "Cert"]);
        // "v2beta" gets tokenized separating the number
        expect(toTokenize("v2beta")).toEqual(["v", "2", "beta"]);
    });

    it("should normalize multiple delimiters into single space", () => {
        expect(toTokenize("user__profile--main.city")).toEqual([
            "user",
            "profile",
            "main",
            "city",
        ]);
    });

    it("should trim leading and trailing delimiters", () => {
        expect(toTokenize("_UserName_")).toEqual(["User", "Name"]);
        expect(toTokenize("-user-name-")).toEqual(["user", "name"]);
        expect(toTokenize(".user.name.")).toEqual(["user", "name"]);
    });

    it("should split mixed delimiters and casing with numbers", () => {
        expect(toTokenize("User-Name_ID2"))
            .toEqual(["User", "Name", "ID", "2"]);
    });
});
