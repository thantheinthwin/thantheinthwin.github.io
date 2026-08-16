import fs from "fs";
import path from "path";
import { imageSize } from "image-size";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import { ImageIcon, InfoIcon } from "lucide-react";

// Self-hosted images (no CDN): measure dimensions from public/ at render time
// so the layout reserves space before the image loads (no CLS). Rasters go
// through next/image for on-demand resizing; SVGs are served as-is since the
// image optimizer doesn't process them.
function BlogImage({ src = "", alt = "" }: { src?: string; alt?: string }) {
  const caption = alt && (
    <span className="mt-2 block text-center text-xs text-muted-foreground">
      {alt}
    </span>
  );

  if (src.startsWith("/")) {
    try {
      const buffer = fs.readFileSync(path.join(process.cwd(), "public", src));
      const { width, height } = imageSize(buffer);
      if (width && height) {
        const image = src.endsWith(".svg") ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(max-width: 768px) 100vw, 576px"
            className="h-auto w-full rounded border"
          />
        );
        // span-based figure: markdown nests images inside <p>, where <figure> is invalid
        return (
          <span className="my-6 block">
            {image}
            {caption}
          </span>
        );
      }
    } catch {
      // fall through to the plain <img> below (e.g. file missing in public/)
    }
  }

  return (
    <span className="my-6 block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-auto w-full rounded border"
      />
      {caption}
    </span>
  );
}

// Placeholder for a diagram that hasn't been migrated from the source post yet.
function MissingImage({ caption }: { caption?: string }) {
  return (
    <span className="my-6 flex flex-col items-center gap-2 rounded border border-dashed p-8 text-center text-xs text-muted-foreground">
      <ImageIcon className="h-5 w-5" strokeWidth={1.5} />
      <span>
        {caption ? `${caption} — ` : ""}not yet migrated from the original post.
      </span>
    </span>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 flex gap-3 rounded border bg-secondary/50 p-4 text-sm text-foreground/90">
      <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
      <div className="[&>p]:m-0 space-y-2">{children}</div>
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1 className="mt-10 mb-4 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h2: (props) => (
    <h2
      className="mt-10 mb-4 scroll-mt-24 border-b pb-2 text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-8 mb-3 scroll-mt-24 text-lg font-medium tracking-tight" {...props} />
  ),
  h4: (props) => (
    <h4 className="mt-6 mb-2 scroll-mt-24 font-medium" {...props} />
  ),
  p: (props) => <p className="my-4 leading-7 text-foreground/80" {...props} />,
  a: ({ href = "", ...props }) => {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="underline underline-offset-4 decoration-muted-foreground hover:text-primary transition-colors"
        {...props}
      />
    );
  },
  ul: (props) => (
    <ul className="my-4 list-disc space-y-2 pl-6 text-foreground/80" {...props} />
  ),
  ol: (props) => (
    <ol className="my-4 list-decimal space-y-2 pl-6 text-foreground/80" {...props} />
  ),
  li: (props) => <li className="leading-7 [&>p]:my-1" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-muted-foreground/40 pl-4 italic text-muted-foreground"
      {...props}
    />
  ),
  hr: () => <hr className="my-8" />,
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border-b px-3 py-2 text-left font-medium" {...props} />
  ),
  td: (props) => (
    <td className="border-b border-border/50 px-3 py-2 text-foreground/80" {...props} />
  ),
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded border bg-input/50 p-4 text-[13px] leading-6 font-mono"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[13px] [pre_&]:bg-transparent [pre_&]:p-0"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
  img: BlogImage,
  Callout,
  MissingImage,
};
