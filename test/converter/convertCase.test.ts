import {convertCase} from "../../src/converter/convertCase";
import {CaseStyle} from "../../src";

describe("convertCase", () => {
    it("should convert single segment to camel case", () => {
        expect(convertCase("first_name", "camel")).toBe("firstName");
        expect(convertCase("user_id", "camel")).toBe("userId");
    });

    it("should convert single segment to snake case", () => {
        expect(convertCase("firstName", "snake")).toBe("first_name");
        expect(convertCase("UserId", "snake")).toBe("user_id");
    });

    it("should convert single segment to kebab case", () => {
        expect(convertCase("firstName", "kebab")).toBe("first-name");
        expect(convertCase("UserId", "kebab")).toBe("user-id");
    });

    it("should convert multi-part path with dots", () => {
        expect(convertCase("profile.cityName", "snake")).toBe("profile_city_name");
        expect(convertCase("profile.cityName", "camel")).toBe("profileCityName");
        expect(convertCase("profile.cityName", "kebab")).toBe("profile-city-name");
    });

    it("should keep consistent output for already matching style", () => {
        expect(convertCase("alreadyCamelCase", "camel")).toBe("alreadyCamelCase");
        expect(convertCase("already_snake_case", "snake")).toBe("already_snake_case");
        expect(convertCase("already-kebab-case", "kebab")).toBe("already-kebab-case");
    });

    it("should handle uppercase acronyms correctly", () => {
        expect(convertCase("APIResponse", "snake")).toBe("api_response");
        expect(convertCase("APIResponse", "kebab")).toBe("api-response");
        expect(convertCase("api_response", "camel")).toBe("apiResponse");
    });

    it("should return empty string when input is empty", () => {
        expect(convertCase("", "camel")).toBe("");
        expect(convertCase("", "snake")).toBe("");
        expect(convertCase("", "kebab")).toBe("");
    });

    it("should support paths with multiple dots", () => {
        const path = "user.profile.mainCity";
        expect(convertCase(path, "snake")).toBe("user_profile_main_city");
        expect(convertCase(path, "camel")).toBe("userProfileMainCity");
        expect(convertCase(path, "kebab")).toBe("user-profile-main-city");
    });

    it("should support CaseStyle type explicitly", () => {
        const style: CaseStyle = "camel";
        expect(convertCase("user_name", style)).toBe("userName");
    });

    it("should handle numbers and mixed delimiters", () => {
        const input = "user-id.v2beta";
        expect(convertCase(input, "camel")).toBe("userIdV2Beta");
        expect(convertCase(input, "snake")).toBe("user_id_v_2_beta");
        expect(convertCase(input, "kebab")).toBe("user-id-v-2-beta");
    });
});
