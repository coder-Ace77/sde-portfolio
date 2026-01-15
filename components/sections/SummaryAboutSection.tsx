"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SummaryAboutSection() {
    return (
        <section className="py-10 border-b border-border/10">
            <div className="container px-4 sm:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row gap-12 items-start"
                >
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl font-bold font-display tracking-tighter sm:text-4xl text-foreground">
                            In short
                        </h2>
                        <div className="mt-5 border-l-2 border-brand pl-6 space-y-4">
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                I am a Software Development Engineer at Publicis Sapient and a Computer Science graduate from IIT Bhilai. I specialize in engineering high-performance microservices and optimizing application delivery.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Beyond full-stack development, I am a LeetCode Guardian and a Certified AWS Cloud Practitioner. I am passionate about distributed systems and AI, as seen in my work building asynchronous coding platforms and multi-agent AI systems.
                            </p>
                        </div>
                        <div className="pt-4">
                            <Link
                                href="/about"
                                className="inline-flex items-center text-foreground font-semibold border-b border-brand hover:text-brand transition-all pb-0.5"
                            >
                                More about me <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 w-full max-w-sm aspect-square bg-secondary/10 flex items-center justify-center p-8 border border-border">
                        <div className="text-center space-y-4">
                            <div className="text-6xl">👨‍💻</div>
                            <div className="text-sm font-mono uppercase tracking-widest text-muted-foreground">SDE @ Publicis Sapient</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}