export function toKebab(tokens: string[]): string {
    return tokens.map((t) => t.toLowerCase()).join("-");
}