import Link from "next/link";
import { Github, Linkedin, Twitter, Mail , CodeSquare} from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 px-4 sm:px-8">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by <span className="font-medium text-foreground">Mohd Adil</span>.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-foreground">
                        <Github className="h-5 w-5" />
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-foreground">
                        <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link href="https://twitter.com" target="_blank" className="text-muted-foreground hover:text-foreground">
                        <CodeSquare className="h-5 w-5" />
                    </Link>
                    <Link href="mailto:contact@example.com" className="text-muted-foreground hover:text-foreground">
                        <Mail className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
