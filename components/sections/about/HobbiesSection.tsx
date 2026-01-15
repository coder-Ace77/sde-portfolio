"use client";

import { motion } from "framer-motion";
import { Heart, Target, Trophy, Terminal, Library } from "lucide-react";

const hobbies = [
    { 
        name: "Badminton", 
        icon: Target, 
        desc: "Regular competitive play that hones reflexes, strategic thinking, and physical endurance." 
    },
    { 
        name: "CP", 
        icon: Trophy, 
        desc: "Solving complex algorithmic puzzles and optimizing data structures to sharpen logical reasoning." 
    },
    { 
        name: "Automation", 
        icon: Terminal, 
        desc: "Architecting custom scripts and tinkering with Linux kernels to build the ultimate efficient workflow." 
    },
    { 
        name: "History", 
        icon: Library, 
        desc: "Analyzing historical patterns and civilizations to understand the underlying logic of the modern world." 
    },
];

export function HobbiesSection() {
    return (
        <section className="py-12">
            <h2 className="text-3xl font-bold font-display mb-8 flex items-center gap-2">
                <Heart className="h-8 w-8 text-brand" /> Hobbies & Interests
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hobbies.map((hobby, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="flex flex-col items-center justify-center p-6 border border-border/40 hover:border-brand/50 hover:bg-brand/5 transition-all duration-300 cursor-default group"
                    >
                        <hobby.icon className="h-8 w-8 text-foreground/70 group-hover:text-brand mb-3 transition-colors duration-300" />
                        <div className="font-bold mb-2">{hobby.name}</div>
                        <div className="text-[11px] leading-relaxed text-muted-foreground text-center line-clamp-3">
                            {hobby.desc}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}