import { getPostBySlug, getPostSlugs } from "@/lib/markdown";
import { getHeadings } from "@/lib/toc";
import { TableOfContents } from "@/components/ui/table-of-contents";
import { MDXImage } from "@/components/mdx/mdx-image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format } from "date-fns";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export async function generateStaticParams() {
    const posts = getPostSlugs("blogs");
    return posts.map((post) => ({
        slug: post.replace(/\.md$/, ""),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug("blogs", slug, ["title", "description"]);
    return {
        title: `${post.title} | Blog`,
        description: post.description,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug("blogs", slug, [
        "title",
        "date",
        "content",
        "tags",
    ]);

    const headings = getHeadings(post.content);

    return (
        <div className="container py-12 md:py-24 px-4 sm:px-6 max-w-[1400px] mx-auto flex gap-12 relative">
            <article className="max-w-4xl min-w-0 w-full flex-1">
                <Link
                    href="/blogs"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blogs
                </Link>

                <div className="space-y-4 mb-12 text-center">
                    <div className="flex justify-center gap-2 mb-4">
                        {post.tags?.map((tag: string) => (
                            <span key={tag} className="bg-secondary px-2 py-0.5 rounded-md text-sm font-medium text-secondary-foreground">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl font-bold font-display sm:text-5xl leading-tight text-foreground">{post.title}</h1>
                    <time className="text-muted-foreground block" dateTime={post.date}>
                        {format(new Date(post.date), "MMMM d, yyyy")}
                    </time>
                </div>

                <div className="prose prose-zinc dark:prose-invert text-foreground max-w-none prose-lg prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground">
                    <MDXRemote
                        source={post.content}
                        components={{ img: MDXImage }}
                        options={{
                            mdxOptions: {
                                rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]
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
