"use client";

import { motion } from "framer-motion";
import { Badge } from "lucide-react"; // Wait, I need a Badge UI component, let's just make a simple wrapper for now or use my own styles.

export function ExperienceSection() {
    const experiences = [
        {
            company: "Publicis Sapient",
            role: "Software Development Engineer 1",
            period: "June 2025 - Present",
            description: "As an SDE-1 at Publicis Sapient, I am part of an agile engineering team building and maintaining digital products and services.I work across the full software development lifecycle from requirements and design to coding, deployment, and post-production support.",
            skills: ["Java Springboot", "Next.js", "TypeScript", "AWS"]
        },
    ];

    return (
        <section className="container py-24 sm:py-32 px-4 sm:px-8" id="experience">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-4 text-center mb-16"
            >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-display">Work Experience</h2>
                <p className="text-muted-foreground max-w-[600px]">
                    My professional journey and the companies where I've made an impact.
                </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-8">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative pl-8 md:pl-0"
                    >
                        <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                            <div className="md:w-1/4 pt-1">
                                <p className="text-sm font-medium text-muted-foreground">{exp.period}</p>
                            </div>
                            <div className="md:w-3/4 space-y-2 pb-8 border-l border-border pl-8 md:pl-8 relative text-left">
                                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />

                                <h3 className="text-xl font-bold">{exp.company}</h3>
                                <p className="text-base font-medium text-foreground/80">{exp.role}</p>
                                <p className="text-muted-foreground leading-relaxed">
                                    {exp.description}
                                </p>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {exp.skills.map(skill => (
                                        <span key={skill} className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
