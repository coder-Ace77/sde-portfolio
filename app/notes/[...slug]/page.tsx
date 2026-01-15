import { getPostBySlug } from "@/lib/markdown";
import { getHeadings } from "@/lib/toc";
import { TableOfContents } from "@/components/ui/table-of-contents";
import { MDXImage } from "@/components/mdx/mdx-image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getPostSlugs } from "@/lib/markdown";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export async function generateStaticParams() {
    const posts = getPostSlugs("notes");
    return posts.map(pathStr => ({
        slug: pathStr.replace(/\.md$/, "").split("/")
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    try {
        const note = getPostBySlug("notes", slug, ["title", "description"]);
        return {
            title: `${note.title} | Notes`,
            description: note.description,
        };
    } catch (e) {
        return {
            title: "Note Not Found",
        };
    }
}

export default async function NotePage({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;

    let note;
    try {
        note = getPostBySlug("notes", slug, [
            "title",
            "description",
            "content",
            "tags",
            "date"
        ]);
    } catch (e) {
        notFound();
    }

    const headings = getHeadings(note.content);

    return (
        <div className="flex gap-8 xl:gap-12 relative">
            <article className="max-w-3xl min-w-0 w-full flex-1">
                <div className="pb-8 mb-8 border-b">
                    <div className="flex gap-2 mb-4">
                        {note.tags?.map((tag: string) => (
                            <span key={tag} className="text-sm text-muted-foreground font-mono bg-secondary px-2 py-0.5 rounded">
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl font-bold font-display mb-4 text-foreground">{note.title}</h1>
                    <p className="text-xl text-muted-foreground">{note.description}</p>
                </div>

                <div className="prose prose-zinc dark:prose-invert max-w-none text-foreground prose-headings:font-display prose-headings:font-bold prose-headings:text-emerald-600 dark:prose-headings:text-emerald-500 prose-h1:text-foreground prose-a:no-underline hover:prose-a:no-underline prose-pre:bg-secondary/50 prose-pre:border prose-pre:rounded-xl prose-strong:text-foreground">
                    <MDXRemote
                        source={note.content}
                        components={{
                            img: MDXImage
                        }}
                        options={{
                            mdxOptions: {
                                rehypePlugins: [rehypeSlug]
                            }
                        }}
                    />
                </div>
            </article>

            <div className="hidden xl:block w-64 shrink-0">
                <div className="sticky top-24">
                    <TableOfContents headings={headings} />
                </div>
            </div>
        </div>
    );
}
