export const getByPath = (obj: unknown, path: string): unknown => {
    if (obj == null) return undefined;
    return path.split(".").reduce<any>((acc, part) => (acc == null ? undefined : acc[part]), obj);
};