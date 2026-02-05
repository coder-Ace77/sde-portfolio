"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { TableOfContents } from "./table-of-contents";
import { cn } from "@/lib/utils";

interface TocItem {
    text: string;
    slug: string;
    level: number;
}

interface MobileTOCProps {
    headings: TocItem[];
}

export function MobileTOC({ headings }: MobileTOCProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (headings.length === 0) return null;

    return (
        <>
            {/* Mobile TOC Button - Fixed at top */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="xl:hidden fixed top-20 right-4 z-40 p-3 bg-card border shadow-lg rounded-lg hover:bg-accent transition-colors"
                aria-label="Toggle table of contents"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Mobile TOC Drawer */}
            <div
                className={cn(
                    "xl:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-card border-l shadow-2xl z-30 transform transition-transform duration-300 ease-in-out overflow-y-auto",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="p-6 pt-24">
                    <TableOfContents headings={headings} />
                </div>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="xl:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-20"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
