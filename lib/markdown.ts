import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export type ContentType = "blogs" | "notes" | "projects";

// Helper to get all files recursively
function getFilesRecursively(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);

    list.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            // Recurse into subdirectory
            results = results.concat(getFilesRecursively(filePath));
        } else {
            results.push(filePath);
        }
    });

    return results;
}

export function getPostSlugs(type: ContentType) {
    // This will be done in the page component directly or a shared MDX component.
    // Let's check page.tsx first.
    const dir = path.join(contentDirectory, type);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        return [];
    }

    const files = getFilesRecursively(dir);
    return files.map(file => path.relative(dir, file));
}

export function getPostBySlug(type: ContentType, slug: string | string[], fields: string[] = []) {
    const slugPath = Array.isArray(slug) ? slug.join("/") : slug;
    const realSlug = slugPath.replace(/\.md$/, "");

    const fullPath = path.join(contentDirectory, type, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
        throw new Error(`File not found: ${fullPath}`);
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    type Items = { [key: string]: any };

    const items: Items = {};

    fields.forEach((field) => {
        if (field === "slug") {
            items[field] = realSlug;
        }
        if (field === "content") {
            items[field] = content;
        }
        // Extract category from path if requested (for notes)
        if (field === "category") {
            const parts = realSlug.split("/");
            if (parts.length > 1) {
                items[field] = parts[0];
            } else {
                items[field] = "General";
            }
        }

        if (typeof data[field] !== "undefined") {
            items[field] = data[field];
        }
    });

    return items;
}

export function getAllPosts(type: ContentType, fields: string[] = []) {
    const slugs = getPostSlugs(type);
    const posts = slugs
        .filter(slug => slug.endsWith(".md"))
        .map((slug) => getPostBySlug(type, slug, fields))
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}

// -- RECURSIVE TREE LOGIC --

export interface TreeNode {
    name: string;
    type: "file" | "folder";
    path: string; // relative path from type dir, e.g. "react/hooks"
    children?: TreeNode[];
    meta?: any; // metadata for files (title, etc.)
}

export function getNotesTree(): TreeNode[] {
    const dir = path.join(contentDirectory, "notes");
    if (!fs.existsSync(dir)) return [];

    return buildTree(dir, "");
}

function buildTree(currentDir: string, relativePath: string): TreeNode[] {
    const items = fs.readdirSync(currentDir);
    const nodes: TreeNode[] = [];

    items.forEach(item => {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        const itemRelativePath = relativePath ? path.join(relativePath, item) : item;

        if (stat && stat.isDirectory()) {
            const children = buildTree(fullPath, itemRelativePath);
            // Only include folders that have children (content)
            if (children.length > 0) {
                nodes.push({
                    name: item,
                    type: "folder",
                    path: itemRelativePath,
                    children: children
                });
            }
        } else if (item.endsWith(".md")) {
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data } = matter(fileContents);

            nodes.push({
                name: item.replace(".md", ""),
                type: "file",
                path: itemRelativePath.replace(".md", ""),
                meta: {
                    title: data.title || item.replace(".md", "")
                }
            });
        }
    });

    // Sort: Folders first, then files. Alphabetical or by some order if needed.
    // For now: Folders first, then files.
    nodes.sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === "folder" ? -1 : 1;
    });

    return nodes;
}
