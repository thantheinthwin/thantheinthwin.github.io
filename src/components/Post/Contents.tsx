"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { TocHeading } from "@/lib/toc";
import { cn } from "@/lib/utils";

// A heading counts as the current section once its top passes this line
// (px from the top of the viewport). A contents jump lands headings at 96px
// (scroll-mt-24), below the 44px bar and above this line.
const CURRENT_LINE = 120;

const pad = (n: number) => String(n).padStart(2, "0");

interface ContentsState {
  headings: TocHeading[];
  // null until the tracker has run, so the server render marks no section
  current: number | null;
  setCurrent: (index: number) => void;
}

const ContentsContext = createContext<ContentsState | null>(null);

function useContents(): ContentsState {
  const state = useContext(ContentsContext);
  if (!state) throw new Error("Contents components must be inside <ContentsProvider>");
  return state;
}

// Tracks which h2 the reader is in, for the rail and the bar. The ids come
// from the post's own MDX compile (src/lib/toc.ts).
export function ContentsProvider({
  headings,
  children,
}: {
  headings: TocHeading[];
  children: React.ReactNode;
}) {
  const [current, setCurrent] = useState<number | null>(null);
  const endRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const targets = headings
      .map((heading, index) => ({ index, el: document.getElementById(heading.id) }))
      .filter((t): t is { index: number; el: HTMLElement } => t.el !== null);
    if (targets.length === 0) {
      setCurrent(0);
      return;
    }

    // Recompute from every heading on each change, so long sections (no h2
    // in view) and scrolling back up both resolve to the right section.
    // Once the reader has scrolled to the end of the post, the last section
    // may be too short to reach the line, so the lowest heading in view
    // counts instead. (Not before scrolling: a short post would open with
    // its last section marked.)
    const update = () => {
      const end = endRef.current;
      const atEnd = scrollY > 0 && end !== null && end.getBoundingClientRect().top <= innerHeight;
      const line = atEnd ? innerHeight : CURRENT_LINE;
      let next = 0;
      for (const { index, el } of targets) {
        if (el.getBoundingClientRect().top <= line) next = index;
      }
      setCurrent(next);
    };

    // The root runs from the line to far below the page, so a heading's state
    // only depends on which side of the line it is. A jump (a contents link,
    // Home/End) that carries headings from above the line to below the
    // viewport still changes their state and fires the observer.
    const observer = new IntersectionObserver(update, {
      rootMargin: `-${CURRENT_LINE}px 0px ${document.documentElement.scrollHeight}px 0px`,
      threshold: [0, 1],
    });
    for (const { el } of targets) observer.observe(el);
    const endObserver = new IntersectionObserver(update);
    if (endRef.current) endObserver.observe(endRef.current);
    update();
    return () => {
      observer.disconnect();
      endObserver.disconnect();
    };
  }, [headings]);

  return (
    <ContentsContext.Provider value={{ headings, current, setCurrent }}>
      {children}
      {/* marks the end of the post grid for the tracking above */}
      <span ref={endRef} aria-hidden="true" className="block h-px" />
    </ContentsContext.Provider>
  );
}

function ContentsList({
  variant,
  onPick,
}: {
  variant: "rail" | "panel";
  onPick?: (id: string) => void;
}) {
  const { headings, current, setCurrent } = useContents();
  const panel = variant === "panel";

  return (
    <ol>
      {headings.map((heading, index) => {
        const isCurrent = index === current;
        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={isCurrent ? "location" : undefined}
              onClick={() => {
                setCurrent(index);
                onPick?.(heading.id);
              }}
              className={cn(
                "relative flex items-start border-t border-border/50 text-muted-foreground transition-colors hover:text-foreground",
                isCurrent && "text-foreground",
                panel
                  ? "min-h-11 gap-2.5 py-3 pl-3 text-sm leading-5"
                  : "min-h-7 gap-2 py-1.5 pl-2.5 text-xs leading-4",
                panel && index === 0 && "border-t-0",
              )}
            >
              {isCurrent && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 w-0.5 bg-foreground",
                    panel ? "inset-y-3" : "inset-y-1.5",
                  )}
                />
              )}
              <span
                className={cn(
                  "shrink-0 font-mono text-muted-foreground",
                  panel ? "w-5 text-xs leading-5" : "w-4 text-[10px] leading-4",
                )}
              >
                {pad(index + 1)}
              </span>
              <span>{heading.text}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

// Wide desktop: the left rail. Plain anchor links, so it works without JS.
export function ContentsRail({ className }: { className?: string }) {
  return (
    <nav aria-label="Contents" className={className}>
      <p className="mb-2 flex h-5 items-center text-xs font-semibold uppercase tracking-wide">
        Contents
      </p>
      <ContentsList variant="rail" />
    </nav>
  );
}

// Below xl: a sticky bar naming the current section, which opens the full
// list. It stays invisible (keeping its space) until the tracker has run;
// without JS the <noscript> list below stands in for it.
export function ContentsBar({ className }: { className?: string }) {
  const { headings, current } = useContents();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ready = current !== null;
  const index = current ?? 0;

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // after a pick, focus moves to the heading the link jumps to
  const pick = (id: string) => {
    setOpen(false);
    const heading = document.getElementById(id);
    if (!heading) return;
    if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  };

  const Chevron = open ? ChevronUp : ChevronDown;

  return (
    <>
      <div className={cn("sticky top-0 z-30", !ready && "invisible", className)}>
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls="post-contents-panel"
          onClick={() => setOpen((value) => !value)}
          className="relative z-10 flex h-11 w-full items-center gap-2.5 border-b bg-background px-5 text-left text-sm leading-5 lg:px-0"
        >
          <span className="sr-only">Contents, current section: </span>
          <span className="shrink-0 font-mono text-xs leading-5 text-muted-foreground">
            {pad(index + 1)}
          </span>
          <span className="min-w-0 flex-1 truncate">{headings[index]?.text}</span>
          <Chevron aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
        </button>

        {open && (
          // dims the post behind the list; a tap outside the list closes it
          <div aria-hidden="true" onClick={close} className="fixed inset-0 bg-background/80" />
        )}

        <div
          id="post-contents-panel"
          hidden={!open}
          className="absolute inset-x-0 top-11 z-10 max-h-[calc(100dvh-2.75rem)] overflow-y-auto border-b bg-background px-5 pb-2 shadow-[0_24px_40px_-16px_rgba(0,0,0,0.8)] lg:px-0"
        >
          <nav aria-label="Contents">
            <ContentsList variant="panel" onPick={pick} />
          </nav>
        </div>
      </div>

      {/* without JS the bar can't open, so the list shows under it, unstuck */}
      <noscript>
        <nav aria-label="Contents" className="mb-2 xl:hidden">
          <ContentsList variant="panel" />
        </nav>
      </noscript>
    </>
  );
}
