import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";
import { format } from "date-fns";

export const metadata = {
    title: "Blogs | DevPortfolio",
    description: "Thoughts on software development and technology.",
};

export default function BlogsPage() {
    const blogs = getAllPosts("blogs", ["title", "description", "slug", "date", "tags"]);

    return (
        <div className="container py-12 md:py-24 px-4 sm:px-8 max-w-4xl mx-auto">
            <div className="flex flex-col gap-4 mb-16">
                <h1 className="text-4xl font-bold font-display sm:text-5xl">Blog</h1>
                <p className="text-muted-foreground text-lg">
                    Thoughts, tutorials, and insights on web development.
                </p>
            </div>

            <div className="flex flex-col gap-12">
                {blogs.map((blog) => (
                    <article key={blog.slug} className="flex flex-col gap-4 group">
                        <Link href={`/blogs/${blog.slug}`} className="flex flex-col gap-2">
                            <h2 className="text-2xl font-bold font-display group-hover:text-primary transition-colors">
                                {blog.title}
                            </h2>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <time dateTime={blog.date}>{format(new Date(blog.date), "MMMM d, yyyy")}</time>
                                <span>•</span>
                                <div className="flex gap-2">
                                    {blog.tags?.map((tag: string) => (
                                        <span key={tag} className="bg-secondary px-2 py-0.5 rounded-md text-xs text-secondary-foreground">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                {blog.description}
                            </p>
                        </Link>
                        <Link href={`/blogs/${blog.slug}`} className="text-sm font-medium underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-all w-fit">
                            Read more
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
