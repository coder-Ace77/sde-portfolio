import { Button } from "@/components/ui/button";
import { Download, ExpandIcon, Mail } from "lucide-react";
import Link from "next/link";
import { EducationSection } from "@/components/sections/about/EducationSection";
import { AboutTechSection } from "@/components/sections/about/AboutTechSection";
import { AchievementsSection } from "@/components/sections/about/AchievementsSection";
import { HobbiesSection } from "@/components/sections/about/HobbiesSection";
import Image from "next/image";
import { ExperienceSection } from "@/components/sections/about/WorkExperience";

export const metadata = {
    title: "About Me | Portfolio",
    description: "Learn more about my background, education, and skills.",
};

export default function AboutPage() {
    return (
        <div className="container px-4 sm:px-6 max-w-7xl mx-auto py-12 md:py-20">
            <section className="flex flex-col md:flex-row gap-12 items-center mb-20 border-b border-border/40 pb-12">
                <div className="flex-1 space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold font-display leading-tight tracking-tighter">
                        Hi, I&apos;m <span className="text-brand">Mohd Adil</span>
                    </h1>
                    <div className="border-l-2 border-brand pl-6 space-y-4">
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            A dedicated software engineer with a passion for building scalable web applications and solving real-world problems through code.
                        </p>
                        <p className="text-lg text-muted-foreground">
                            I specialize in the JavaScript ecosystem, focusing on React, Next.js, and Node.js. My goal is to create intuitive digital experiences that make a difference.
                        </p>
                    </div>
                </div>
                <div className="w-full max-w-xs aspect-square relative overflow-hidden bg-secondary border border-green-500 rounded-full shadow-2xl">
                    <Image
                        src="/profile.png"
                        alt="Profile"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-secondary/50 text-muted-foreground text-sm font-medium z-[-1]">
                        Add /public/profile.jpg
                    </div>
                </div>
            </section>

            <div className="space-y-20">
                <ExperienceSection/>
                <EducationSection />
                <AchievementsSection />
                <HobbiesSection />
            </div>
        </div>
    );
}
