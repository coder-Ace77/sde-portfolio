import { getPostBySlug, getPostSlugs } from "@/lib/markdown";
import { getHeadings } from "@/lib/toc";
import { TableOfContents } from "@/components/ui/table-of-contents";
import { MDXImage } from "@/components/mdx/mdx-image";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Button } from "@/components/ui/button";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export async function generateStaticParams() {
    const posts = getPostSlugs("projects");
    return posts.map((post) => ({
        slug: post.replace(/\.md$/, ""),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getPostBySlug("projects", slug, ["title", "description"]);
    return {
        title: `${project.title} | Projects`,
        description: project.description,
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getPostBySlug("projects", slug, [
        "title",
        "description",
        "content",
        "image",
        "tech_stack",
        "repo_link",
        "demo_link",
    ]);

    const headings = getHeadings(project.content);

    return (
        <div className="container py-12 px-4 sm:px-6 max-w-[1400px] mx-auto flex gap-12 relative">
            <article className="max-w-4xl min-w-0 w-full flex-1">
                <Link
                    href="/projects"
                    className="inline-flex items-center text-sm hover:text-foreground mb-8 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Projects
                </Link>

                {/* Header content ... */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold font-display mb-4 text-foreground">{project.title}</h1>
                    <div className="text-xl text-muted-foreground mb-6">{project.description}</div>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech_stack?.map((tech: string) => (
                            <span key={tech} className="bg-secondary px-2.5 py-0.5 rounded-md text-sm font-medium text-secondary-foreground">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        {project.demo_link && (
                            <Button asChild>
                                <a href={project.demo_link} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Live Demo
                                </a>
                            </Button>
                        )}
                        {project.repo_link && (
                            <Button variant="outline" asChild>
                                <a href={project.repo_link} target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-2 h-4 w-4" />
                                    View Code
                                </a>
                            </Button>
                        )}
                    </div>
                </div>

                <div className="prose prose-zinc dark:prose-invert text-foreground max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground prose-h1:text-3xl prose-h2:text-2xl prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground">
                    <MDXRemote
                        source={project.content}
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
