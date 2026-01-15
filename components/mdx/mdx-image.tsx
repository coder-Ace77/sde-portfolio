"use client";

import Image from "next/image";

export function MDXImage({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
    if (!src) return null;
    const imageSrc = src as string;

    // Check if external
    const isExternal = imageSrc.startsWith("http");

    if (isExternal) {
        // Standard img for external if domain not allowed in next.config, or just use next/image with unoptimized if wanted
        // For now, let's use standard img for external ease, and next/image for local
        /* eslint-disable-next-line @next/next/no-img-element */
        return <img src={imageSrc} alt={alt} className="rounded-xl border border-border" {...props} />;
    }

    return (
        <div className="relative my-6 rounded-xl overflow-hidden border border-border bg-secondary/20">
            <Image
                src={imageSrc}
                alt={alt || "Image"}
                width={1200}
                height={630}
                className="object-cover"
                style={{ width: '100%', height: 'auto' }}
            />
            {alt && <p className="text-center text-sm text-muted-foreground mt-2">{alt}</p>}
        </div>
    );
}
