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
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import { NoteControls } from "@/components/note-controls";
import { MobileTOC } from "@/components/ui/mobile-toc";

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
        <div className="flex gap-6 xl:gap-8 relative">
            <NoteControls />

            {/* Mobile TOC */}
            <MobileTOC headings={headings} />

            <article
                className="min-w-0 w-full flex-1 transition-all duration-300 ease-in-out mx-auto"
                style={{
                    maxWidth: 'var(--note-wrapper-width, 768px)' // fallback to 768px
                }}
            >
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

                <div
                    className="prose prose-zinc dark:prose-invert max-w-none text-foreground prose-headings:font-display prose-headings:font-bold prose-headings:text-emerald-500 dark:prose-headings:text-emerald-400 prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-a:text-emerald-500 hover:prose-a:text-emerald-400 prose-pre:bg-[#0d1117] prose-pre:border prose-pre:rounded-xl prose-strong:text-foreground"
                    style={{ fontSize: 'var(--note-font-size, 16px)' }}
                >
                    <MDXRemote
                        source={note.content}
                        components={{
                            img: MDXImage
                        }}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkMath],
                                rehypePlugins: [rehypeSlug, rehypeKatex, rehypeHighlight]
                            }
                        }}
                    />
                </div>
            </article>

            {/* Desktop TOC */}
            <div className="hidden xl:block w-64 shrink-0">
                <div className="sticky top-24">
                    <TableOfContents headings={headings} />
                </div>
            </div>
        </div>
    );
}
