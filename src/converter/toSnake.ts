export function toSnake(tokens: string[]): string {
    return tokens.map((t) => t.toLowerCase()).join("_");
}
