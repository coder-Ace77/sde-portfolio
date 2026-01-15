"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
    text: string;
    slug: string;
    level: number;
}

interface TableOfContentsProps {
    headings: TocItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -80% 0px" }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.slug);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <div className="space-y-2">
            <p className="font-medium text-sm text-foreground">On This Page</p>
            <ul className="space-y-1 text-sm border-l border-border pl-2">
                {headings.map((heading) => (
                    <li key={heading.slug}>
                        <a
                            href={`#${heading.slug}`}
                            className={cn(
                                "block py-1 transition-colors hover:text-foreground no-underline",
                                activeId === heading.slug
                                    ? "text-brand font-medium border-l-2 border-brand -ml-[9px] pl-2"
                                    : "text-muted-foreground",
                                heading.level === 3 && "pl-4"
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.slug)?.scrollIntoView({
                                    behavior: "smooth",
                                });
                                setActiveId(heading.slug);
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
