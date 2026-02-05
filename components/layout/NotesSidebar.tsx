"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Folder, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { TreeNode } from "@/lib/markdown";

interface NotesSidebarProps {
    tree: TreeNode[];
}

// Recursive Tree Item Component
const TreeItem = ({ node, level = 0 }: { node: TreeNode; level?: number }) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Check if this node or any children is active to default open
    const isActive = node.type === "file"
        ? pathname === `/notes/${node.path}`
        : pathname.startsWith(`/notes/${node.path}/`);

    useEffect(() => {
        if (isActive) {
            setIsOpen(true);
        }
    }, [isActive]);

    const toggleOpen = () => setIsOpen(!isOpen);

    if (node.type === "file") {
        return (
            <Link
                href={`/notes/${node.path}`}
                className={cn(
                    "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors",
                    isActive
                        ? "bg-secondary text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
                style={{ paddingLeft: `${level * 12 + 8}px` }}
            >
                <FileText className="h-3 w-3 shrink-0" />
                <span className="truncate">{node.meta?.title || node.name}</span>
            </Link>
        );
    }

    // Folder
    return (
        <div className="space-y-1">
            <button
                onClick={toggleOpen}
                className={cn(
                    "flex items-center justify-between w-full px-2 py-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group rounded-md hover:bg-secondary/30",
                    isActive && "text-foreground"
                )}
                style={{ paddingLeft: `${level * 12 + 8}px` }}
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    <Folder className="h-4 w-4 shrink-0 text-primary/70" />
                    <span className="truncate">{node.name}</span>
                </div>
                <ChevronRight
                    className={cn(
                        "h-3 w-3 transition-transform duration-200 shrink-0",
                        isOpen ? "rotate-90" : ""
                    )}
                />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && node.children && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        {node.children.map((child) => (
                            <TreeItem key={child.path} node={child} level={level + 1} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export function NotesSidebar({ tree }: NotesSidebarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle Button - Fixed at top left */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-20 left-4 z-40 p-3 bg-card border shadow-lg rounded-lg hover:bg-accent transition-colors"
                aria-label="Toggle notes navigation"
            >
                {isOpen ? <ChevronRight className="rotate-180" size={20} /> : <Folder size={20} />}
            </button>

            {/* Desktop Sidebar - Always visible on md+ screens */}
            <aside className="hidden md:block md:w-64 lg:w-72 shrink-0 md:border-r border-border md:h-[calc(100vh-4rem)] md:sticky md:top-16 overflow-y-auto py-6 pr-4">
                <div className="space-y-1">
                    {tree.map((node) => (
                        <TreeItem key={node.path} node={node} />
                    ))}
                </div>
            </aside>

            {/* Mobile Sidebar Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="md:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-card border-r shadow-2xl z-40 overflow-y-auto"
                        >
                            <div className="py-6 px-4 pt-24">
                                <div className="space-y-1">
                                    {tree.map((node) => (
                                        <TreeItem key={node.path} node={node} />
                                    ))}
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
