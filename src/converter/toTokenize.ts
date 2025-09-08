/**
 * Tokenize a path/key into word tokens.
 * - Splits by dots, underscores, hyphens
 * - Splits on case transitions (camel/Pascal)
 * - Keeps acronyms together (e.g., API -> "API")
 */
export function toTokenize(path: string): string[] {
    if (!path) return [];

    const normalized = path.replace(/[._-]+/g, " ").trim();

    const bumped = normalized
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/([A-Za-z])([0-9])/g, "$1 $2")
        .replace(/([0-9])([A-Za-z])/g, "$1 $2");

    const tokens: string[] = [];

    for (const seg of bumped.split(/\s+/)) {
        if (!seg) continue;
        const words = seg.match(
            /[A-Z]{2,}(?=[A-Z][a-z])|[A-Z][a-z]+(?:[A-Z][a-z]+)*|[A-Z]?[a-z]+|[0-9]+|[A-Z]+/g
        );
        if (words) tokens.push(...words);
    }

    return tokens;
}
