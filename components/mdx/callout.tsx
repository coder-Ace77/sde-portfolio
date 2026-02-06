import { AlertCircle, Info, Lightbulb, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

interface CalloutProps {
    children: React.ReactNode;
    type?: 'note' | 'info' | 'warning' | 'tip' | 'success' | 'danger';
}

const calloutStyles = {
    note: {
        bg: 'bg-blue-50 dark:bg-blue-950/30',
        border: 'border-l-blue-500',
        text: 'text-blue-900 dark:text-blue-200',
        icon: Info,
        iconColor: 'text-blue-500',
    },
    info: {
        bg: 'bg-cyan-50 dark:bg-cyan-950/30',
        border: 'border-l-cyan-500',
        text: 'text-cyan-900 dark:text-cyan-200',
        icon: AlertCircle,
        iconColor: 'text-cyan-500',
    },
    warning: {
        bg: 'bg-amber-50 dark:bg-amber-950/30',
        border: 'border-l-amber-500',
        text: 'text-amber-900 dark:text-amber-200',
        icon: AlertTriangle,
        iconColor: 'text-amber-500',
    },
    tip: {
        bg: 'bg-emerald-50 dark:bg-emerald-950/30',
        border: 'border-l-emerald-500',
        text: 'text-emerald-900 dark:text-emerald-200',
        icon: Lightbulb,
        iconColor: 'text-emerald-500',
    },
    success: {
        bg: 'bg-green-50 dark:bg-green-950/30',
        border: 'border-l-green-500',
        text: 'text-green-900 dark:text-green-200',
        icon: CheckCircle,
        iconColor: 'text-green-500',
    },
    danger: {
        bg: 'bg-red-50 dark:bg-red-950/30',
        border: 'border-l-red-500',
        text: 'text-red-900 dark:text-red-200',
        icon: Zap,
        iconColor: 'text-red-500',
    },
};

export function Callout({ children, type = 'note' }: CalloutProps) {
    const style = calloutStyles[type];
    const Icon = style.icon;

    return (
        <div className={`my-6 p-4 rounded-r-lg border-l-4 ${style.bg} ${style.border} ${style.text}`}>
            <div className="flex gap-3">
                <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${style.iconColor}`} />
                <div className="flex-1 prose-p:my-2 prose-p:first:mt-0 prose-p:last:mb-0">
                    {children}
                </div>
            </div>
        </div>
    );
}

// Enhanced blockquote that detects callout syntax like > [!NOTE]
export function EnhancedBlockquote({ children }: { children: React.ReactNode }) {
    // Try to detect callout type from content
    const childrenString = children?.toString() || '';

    const calloutMatch = childrenString.match(/\[!(NOTE|INFO|WARNING|TIP|SUCCESS|DANGER)\]/i);

    if (calloutMatch) {
        const type = calloutMatch[1].toLowerCase() as keyof typeof calloutStyles;
        // Remove the [!TYPE] marker from content
        const cleanedChildren = childrenString.replace(/\[!(NOTE|INFO|WARNING|TIP|SUCCESS|DANGER)\]\s*/i, '');

        return <Callout type={type}>{cleanedChildren}</Callout>;
    }

    // Default blockquote styling
    return (
        <blockquote className="border-l-4 border-l-emerald-500 pl-4 py-2 my-6 italic text-muted-foreground bg-muted/30 rounded-r">
            {children}
        </blockquote>
    );
}
