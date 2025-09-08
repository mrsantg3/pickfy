export const hasOwn = (obj: object, key: PropertyKey): boolean =>
    Object.prototype.hasOwnProperty.call(obj, key);