import {pickRename} from "../../src";
import {users} from "./fixtures";

describe("pickRename", () => {
    it("should rename keys according to map", () => {
        const user = users[0];
        const res = pickRename(user, { uid: "id", fullName: "name" } as const);
        expect(res).toEqual({ uid: 1, fullName: "Ana" });
    });
    it("should set undefined when source key is missing", () => {
        const user = users[0];
        const res = pickRename(user as any, { alias: "unknown" } as any);
        expect(res).toEqual({ alias: undefined });
    });

    it("should return empty object when map is empty", () => {
        const user = users[0];
        expect(pickRename(user, {} as any)).toEqual({});
    });
});
