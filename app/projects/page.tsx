import { getAllPosts } from "@/lib/markdown";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; 

export const metadata = {
    title: "Projects | DevPortfolio",
    description: "A showcase of my projects and experiments.",
};

export default function ProjectsPage() {
    const projects = getAllPosts("projects", ["title", "description", "slug", "tech_stack", "demo_link", "repo_link", "image"]);

    return (
        <div className="container py-12 md:py-10 px-4 sm:px-8">
            <div className="flex flex-col mb-16">
                <div className="flex items-center gap-4 mb-4">
                    <Code2 className="h-12 w-12 sm:h-20 sm:w-20 text-brand shrink-0" strokeWidth={1.5} />
                    <h1 className="text-4xl font-bold sm:text-6xl tracking-tight">
                        Projects
                    </h1>
                </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                {projects.map((project) => (
                    <div key={project.slug} className="group flex flex-col border rounded-md overflow-hidden bg-card hover:shadow-md transition-all duration-300">
                        <div className="aspect-[2.4/1] w-full bg-secondary relative overflow-hidden border-b border-border">
                            {project.image ? (
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            ) : (
                                <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
                                    <Code2 className="h-6 w-6 text-muted-foreground/20" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <p className="text-white text-xs font-medium">
                                    View Project
                                </p>
                            </div>
                            <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10">
                                <span className="sr-only">View {project.title}</span>
                            </Link>
                        </div>

                        <div className="flex flex-col flex-1 p-5 gap-3">
                            <div className="flex-1 space-y-1.5">
                                <Link href={`/projects/${project.slug}`} className="hover:text-brand transition-colors">
                                    <h2 className="text-xl font-bold font-display leading-tight">{project.title}</h2>
                                </Link>
                                <p className="mt-4 text-muted-foreground line-clamp-2 text-s leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                                {project.tech_stack?.slice(0, 3).map((tech: string) => (
                                    <span key={tech} className="text-[10px] font-semibold px-2 py-0.5 rounded-sm bg-secondary text-secondary-foreground border border-border/50 uppercase tracking-tight">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 pt-2 mt-auto">
                                <Button variant="outline" size="sm" className="w-full h-8 text-xs rounded-sm" asChild>
                                    <Link href={`/projects/${project.slug}`}>
                                        Details <ArrowRight className="ml-2 h-3 w-3" />
                                    </Link>
                                </Button>
                                <Button variant="outline" size="sm" className="w-full h-8 text-xs rounded-sm bg-white text-black" asChild>
                                    <Link href={project.demo_link}>
                                        Live Demo
                                    </Link>
                                </Button>
                                {project.repo_link && (
                                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 rounded-sm" asChild>
                                        <Link href={project.repo_link} target="_blank">
                                            <Github className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
