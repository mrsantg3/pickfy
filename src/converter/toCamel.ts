export function toCamel(tokens: string[]): string {
    if (tokens.length === 0) return "";
    const [head, ...tail] = tokens;
    const h = head.toLowerCase();
    const rest = tail.map((t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
    return [h, ...rest].join("");
}