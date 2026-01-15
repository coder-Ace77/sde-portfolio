"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

const skills = {
    Languages: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
    Frontend: ["React", "Next.js", "Tailwind CSS", "Redux", "Framer Motion"],
    Backend: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Prisma"],
    Tools: ["Git", "Docker", "AWS", "Linux", "VS Code"]
};

export function AboutTechSection() {
    return (
        <section className="py-12 border-b border-border/40">
            <h2 className="text-3xl font-bold font-display mb-8 flex items-center gap-2">
                <Cpu className="h-8 w-8 text-brand" /> Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(skills).map(([category, items], index) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                    >
                        <h3 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
                            <span className="w-1 h-4 bg-brand rounded-none inline-block" />
                            {category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {items.map(item => (
                                <span key={item} className="bg-secondary/30 hover:bg-brand/10 hover:text-brand border border-transparent hover:border-brand/20 px-3 py-1 text-sm font-medium transition-colors cursor-default">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
