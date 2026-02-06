import { cleanTitle } from "@/lib/utils";

export function getHeadings(source: string) {
    const headingLines = source.split("\n").filter((line) => {
        return line.match(/^#{2,3}\s/);
    });

    return headingLines.map((raw) => {
        const text = cleanTitle(raw.replace(/^#{2,3}\s/, ""));
        // slugify: remove special chars, lowercase, replace spaces with dashes
        const slug = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");

        return {
            text,
            slug,
            level: raw.startsWith("###") ? 3 : 2,
        };
    });
}
