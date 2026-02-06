'use client';

import { ReactNode, createElement } from 'react';

interface HeadingProps {
    id?: string;
    children: ReactNode;
    level: 1 | 2 | 3 | 4 | 5 | 6;
}

export function EnhancedHeading({ id, children, level }: HeadingProps) {
    const tagName = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    return createElement(
        tagName,
        { id, className: 'scroll-mt-24' },
        <a
            href={`#${id}`}
            className="no-underline hover:no-underline block"
            onClick={(e) => {
                e.preventDefault();
                document.getElementById(id!)?.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', `#${id}`);
            }}
        >
            {children}
        </a>
    );
}

// Individual heading components
export const H1 = ({ id, children }: { id?: string; children: ReactNode }) => (
    <EnhancedHeading id={id} level={1}>{children}</EnhancedHeading>
);

export const H2 = ({ id, children }: { id?: string; children: ReactNode }) => (
    <EnhancedHeading id={id} level={2}>{children}</EnhancedHeading>
);

export const H3 = ({ id, children }: { id?: string; children: ReactNode }) => (
    <EnhancedHeading id={id} level={3}>{children}</EnhancedHeading>
);

export const H4 = ({ id, children }: { id?: string; children: ReactNode }) => (
    <EnhancedHeading id={id} level={4}>{children}</EnhancedHeading>
);

export const H5 = ({ id, children }: { id?: string; children: ReactNode }) => (
    <EnhancedHeading id={id} level={5}>{children}</EnhancedHeading>
);

export const H6 = ({ id, children }: { id?: string; children: ReactNode }) => (
    <EnhancedHeading id={id} level={6}>{children}</EnhancedHeading>
);
