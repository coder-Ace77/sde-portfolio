"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  Info, X} from "lucide-react";
import { stack } from "../constants/stack";


export function StackSection() {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [activeInfo, setActiveInfo] = useState<string | null>(null);

    return (
        <section className="container py-24 sm:py-32 px-4 sm:px-8" id="tech-stack">
            <div className="flex flex-col gap-16">
                <div className="max-w-4xl">
                    <motion.h2 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold tracking-tighter sm:text-4xl font-display mb-6 antialiased"
                    >
                        Tools & Technologies
                    </motion.h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        My technical foundation is built on high-performance computing and scalable architectures. 
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {stack.map((group) => (
                        <div key={group.category} className="group relative p-8 rounded-3xl border bg-card/50 hover:bg-secondary/10 transition-all duration-300">
                            
                            {/* --- Category Info Button ("i") --- */}
                            <button 
                                onClick={() => setActiveInfo(activeInfo === group.category ? null : group.category)}
                                className="absolute top-6 right-6 p-1.5 rounded-full bg-primary/5 text-primary hover:bg-primary/20 transition-colors z-20"
                            >
                                {activeInfo === group.category ? <X className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                            </button>

                            {/* Category Description Overlay */}
                            <AnimatePresence>
                                {activeInfo === group.category && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute inset-0 z-10 bg-background/95 p-8 rounded-3xl flex flex-col justify-center border-2 border-primary/20"
                                    >
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">About {group.category}</h4>
                                        <p className="text-sm leading-relaxed text-foreground">{group.description}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* --- Content --- */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                    {group.icon}
                                </div>
                                <h3 className="text-xl font-bold tracking-tight">{group.category}</h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {group.items.map((item) => (
                                    <div key={item.name} className="relative">
                                        <span 
                                            onMouseEnter={() => setHoveredItem(item.name)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                            className="px-3 py-1 text-sm font-medium rounded-full bg-background border border-muted-foreground/20 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all cursor-help"
                                        >
                                            {item.name}
                                        </span>

                                        <AnimatePresence>
                                            {hoveredItem === item.name && (
                                                <motion.div 
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    className="absolute bottom-full mb-3 left-0 w-80 z-30 p-3 rounded-2xl bg-popover text-popover-foreground border shadow-xl leading-snug antialiased pointer-events-none"
                                                >
                                                    {item.detail}
                                                    <div className="absolute -bottom-1 left-4 w-2 h-2 bg-popover border-b border-r rotate-45" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}