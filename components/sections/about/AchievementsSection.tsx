"use client";

import { motion } from "framer-motion";
import { Trophy, Award } from "lucide-react";

const achievements = [
    {
        title: "Rookie of Batch",
        issuer: "Publicis Sapient",
        date: "Oct 2025",
        description: "Rookie of the batch given for exceptional performance and team building during training in Publicis Sapient."
    },
    {
        title: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "Nov 2025",
        description: "Associate level certification validating cloud expertise."
    },
    {
        title: "Leetcode Guardian",
        issuer: "Leetcode",
        date: "Continuous",
        description: "Leetcode Guardian with the rating of 2554 currently ranking among top 100 in India."
    },
        {
        title: "Codeforces Expert",
        issuer: "Codeforces",
        date: "Continuous",
        description: "Codeforces expert with the peak rating of 1806."
    }
];

export function AchievementsSection() {
    return (
        <section className="py-12 border-b border-border/40">
            <h2 className="text-3xl font-bold font-display mb-8 flex items-center gap-2">
                <Trophy className="h-8 w-8 text-brand" /> Achievements & Certifications
            </h2>
            <div className="grid grid-cols-1 gap-4">
                {achievements.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group flex gap-4 p-4 border-l-2 border-transparent hover:border-brand bg-secondary/5 hover:bg-secondary/10 transition-all cursor-default"
                    >
                        <div className="shrink-0 mt-1">
                            <Trophy className="h-5 w-5 text-muted-foreground group-hover:text-brand transition-colors" />
                        </div>
                        <div>
                            <div className="flex flex-wrap items-baseline gap-x-2 mb-1">
                                <h3 className="text-lg font-bold leading-tight">{item.title}</h3>
                                <span className="text-sm font-mono text-muted-foreground">({item.date})</span>
                            </div>
                            <div className="text-sm font-medium text-foreground/80 mb-2">{item.issuer}</div>
                            <p className="text-sm max-w-xl">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
