"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Github} from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden py-12 md:py-24 lg:py-32">
            <div className="container relative z-10 flex flex-col items-start gap-8 px-4 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-4"
                >
                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm">
                        <span className="flex h-3 w-3 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                        Available for new opportunities
                    </div>
                    <h1 className="max-w-4xl text-4xl font-bold tracking-tighter leading-[1.1] font-display sm:text-6xl md:text-7xl antialiased">
                        Building scalable <br/>
                        <span className="text-muted-foreground/80">Distributed Applications</span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
                        I'm <span className="text-foreground font-medium">Mohd Adil</span>, a software engineer specializing in building exceptional digital experiences.
                        Currently focused on accessible, human-centered products.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap items-center gap-4"
                >
                    <Button size="lg" className="h-12 w-full sm:w-auto text-base gap-2" asChild>
                        <Link href="/projects">
                            Projects <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 w-full sm:w-auto text-base gap-2" asChild>
                        <Link href="https://github.com" target="_blank">
                            <Github className="h-4 w-4" /> GitHub
                        </Link>
                    </Button>
                </motion.div>
            </div>

            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
            </div>
        </section>
    );
}
