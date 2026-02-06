'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    // Extract language from className (format: language-js, language-python, etc.)
    const language = className?.replace('language-', '') || 'code';

    const handleCopy = () => {
        const code = typeof children === 'string' ? children : children?.toString() || '';
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group">
            {/* Language Badge */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded opacity-70">
                    {language}
                </span>
                {/* Copy Button */}
                <button
                    onClick={handleCopy}
                    className="p-2 rounded bg-secondary hover:bg-accent text-muted-foreground hover:text-foreground transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Copy code"
                >
                    {copied ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                        <Copy className="w-4 h-4" />
                    )}
                </button>
            </div>
            <pre className={className} {...props}>
                {children}
            </pre>
        </div>
    );
}
