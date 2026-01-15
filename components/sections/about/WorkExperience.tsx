"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, Building2 } from "lucide-react";

const experiences = [
    {
        company: "Publicis Sapient",
        position: "Software Development Engineer",
        duration: "June 2025 - Present",
        location: "Hybrid",
        description: "As an SDE-1 at Publicis Sapient, I am part of an agile engineering team building and maintaining digital products and services. I work across the full software development lifecycle from requirements and design to coding, deployment, and post-production support.",
        technologies: ["Java", "Next.js", "PostgreSQL", "AWS"],
        achievements: [
            "Reduced API latency by 80% through Redis caching",
            "Architected Java microservices using Spring Boot",
        ]
    },
];

export function ExperienceSection() {
    return (
        <section className="py-12 border-b border-border/40">
            <h2 className="text-3xl font-bold font-display mb-8 flex items-center gap-2">
                <Briefcase className="h-8 w-8 text-brand" /> Work Experience
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-8 md:pl-0"
                    >
                        <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                            <div className="md:w-1/4 pt-1">
                                <span className="text-sm font-mono text-muted-foreground flex items-center gap-2">
                                    <Calendar className="h-3 w-3" /> {exp.duration}
                                </span>
                            </div>
                            <div className="md:w-3/4 space-y-2 pb-8 border-l border-border pl-8 relative">
                                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-background" />

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-brand font-bold text-xl">
                                        <Building2 className="h-5 w-5" />
                                        {exp.company}
                                    </div>
                                    <span className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">{exp.location}</span>
                                </div>
                                
                                <h3 className="text-lg font-medium text-foreground/90">{exp.position}</h3>

                                <p className="text-muted-foreground leading-relaxed mb-4">{exp.description}</p>

                                <div className="space-y-3">
                                    <div>
                                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Key Contributions</span>
                                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-1">
                                            {exp.achievements.map((achievement, i) => (
                                                <li key={i} className="leading-relaxed">{achievement}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Stack</span>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {exp.technologies.map(tech => (
                                                <span key={tech} className="text-xs border border-border px-2 py-0.5 text-muted-foreground hover:text-foreground transition-colors">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}