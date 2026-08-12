import * as React from "react"

import { cn } from "@/lib/utils"

// ponytail: author-controlled copy only, never user input — safe to render as HTML
function RichText({
  text,
  className,
  ...props
}: { text: string } & Omit<React.ComponentProps<"span">, "dangerouslySetInnerHTML">) {
  return (
    <span
      data-slot="rich-text"
      className={cn("[&_b]:text-foreground [&_strong]:text-foreground", className)}
      dangerouslySetInnerHTML={{ __html: text }}
      {...props}
    />
  )
}

export { RichText }
