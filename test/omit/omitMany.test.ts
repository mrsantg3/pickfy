import {omitMany} from "../../src";

describe("omitMany", () => {
    it("should omit keys from each list item", () => {
        const list = [
            { id: 1, name: "Ana", email: "a@x.com" },
            { id: 2, name: "Bia", email: "b@x.com" },
        ];
        const res = omitMany(list, ["email"] as const);
        expect(res).toEqual([
            { id: 1, name: "Ana" },
            { id: 2, name: "Bia" },
        ]);
    });
  
    it("should return empty array when list is empty", () => {
        expect(omitMany([], ["id"] as const)).toEqual([]);
    });


    it("should ignore keys missing on some items", () => {
        const list = [{ id: 1, a: 2 }, { a: 3 }];
        const res = omitMany(list as any, ["id"] as any);
        expect(res).toEqual([{ a: 2 }, { a: 3 }]);
    });

});
