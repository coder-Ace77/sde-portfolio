import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";
import { Book, Code, Terminal } from "lucide-react";

export const metadata = {
    title: "Notes | DevPortfolio",
    description: "Personal knowledge base and documentation.",
};

export default function NotesIndex() {
    return (
        <div className="max-w-2xl">
            <h1 className="text-4xl font-bold font-display mb-6">Documentation & Notes</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Welcome to my personal notes. This section is structured like a documentation site, allowing me to keep track of snippets, guides, and learnings.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
                <div className="p-6 border rounded-xl bg-card">
                    <Code className="h-8 w-8 mb-4 text-primary" />
                    <h2 className="text-xl font-bold mb-2">Frontend</h2>
                    <p className="text-muted-foreground text-sm">
                        Deep dives into React, Framer Motion, and CSS architecture.
                    </p>
                </div>
                <div className="p-6 border rounded-xl bg-card">
                    <Terminal className="h-8 w-8 mb-4 text-primary" />
                    <h2 className="text-xl font-bold mb-2">Backend & DevOps</h2>
                    <p className="text-muted-foreground text-sm">
                        Notes on Node.js, databases, and deployment pipelines.
                    </p>
                </div>
            </div>

            <div className="mt-12 p-4 bg-secondary/50 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground">
                    Select a topic from the sidebar to get started.
                    <span className="md:hidden"> (Open the menu to view topics)</span>
                </p>
            </div>
        </div>
    );
}
