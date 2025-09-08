export type User = {
    id: number;
    name: string;
    email?: string | null;
    profile: { city: string; age: number };
};

export const users: User[] = [
    { id: 1, name: "Ana", email: "a@x.com", profile: { city: "SP", age: 30 } },
    { id: 2, name: "Bia", email: "b@x.com", profile: { city: "RJ", age: 20 } },
    { id: 3, name: "Ana", email: "a@x.com", profile: { city: "SP", age: 25 } },
];
