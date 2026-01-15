"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award } from "lucide-react";

const education = [
    {
        school: "Indian Institue of Technology Bhilai",
        degree: "Bachelor of Technology in Computer Science",
        year: "2021 - 2025",
        grade: "CGPA: 8.78/10",
        description: "A Btech graduate in 2025 from IIT Bhilai in field of computer science.",
        courses: ["Data Structures & Algorithms", "Operating Systems", "DBMS", "Computer Networks"],
        societies: ["Core Member, Coding Club"]
    },
    // Add more if needed
];

export function EducationSection() {
    return (
        <section className="py-12 border-b border-border/40">
            <h2 className="text-3xl font-bold font-display mb-8 flex items-center gap-2">
                <GraduationCap className="h-8 w-8 text-brand" /> Education
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
                {education.map((edu, index) => (
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
                                <span className="text-sm font-mono text-muted-foreground">{edu.year}</span>
                            </div>
                            <div className="md:w-3/4 space-y-2 pb-8 border-l border-border pl-8 relative">
                                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-background" />

                                <h3 className="text-xl font-bold">{edu.school}</h3>
                                <div className="text-foreground/90 font-medium">{edu.degree}</div>
                                <div className="text-sm mb-4">{edu.grade}</div>

                                <p className="leading-relaxed mb-4">{edu.description}</p>

                                <div className="space-y-3">
                                    <div>
                                        <span className="text-xs font-semibold uppercase tracking-wider">Key Courses</span>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {edu.courses.map(c => (
                                                <span key={c} className="text-xs border border-border px-2 py-0.5 hover:text-foreground transition-colors">{c}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Activities</span>
                                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                                            {edu.societies.map(s => <li key={s}>{s}</li>)}
                                        </ul>
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
