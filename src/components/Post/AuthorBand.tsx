import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AvailabilityStatus } from "@/components/Header/AvailabilityStatus";
import { cn } from "@/lib/utils";

interface AuthorBandProps {
  // the band's inner grid follows the post grid, which has a left column
  // only when the post shows its contents rail
  hasContents: boolean;
}

// Full-width end of every post: who wrote it, and two ways to stay on the site.
export const AuthorBand: React.FC<AuthorBandProps> = ({ hasContents }) => {
  return (
    // prefixed id: a post h2 could slug to "about-the-author"
    <section
      aria-labelledby="post-about-author"
      className="border-t bg-card px-5 py-6 lg:px-8 lg:pt-12 lg:pb-22"
    >
      <div
        className={cn(
          "mx-auto grid w-full max-w-xl gap-4 lg:max-w-none lg:grid-cols-[576px_256px] lg:justify-center lg:gap-x-12 lg:gap-y-6",
          hasContents && "xl:grid-cols-[200px_576px_256px]",
        )}
      >
        <h2
          id="post-about-author"
          className="text-xl font-semibold tracking-tight lg:col-start-1"
        >
          About the author
        </h2>
        <div className={cn("lg:col-start-1", hasContents && "xl:col-start-2 xl:row-start-1")}>
          <div className="flex items-start gap-4">
            <Image
              src="/profile.webp"
              alt=""
              width={48}
              height={48}
              sizes="48px"
              className="size-12 shrink-0 rounded-full object-cover"
            />
            <div>
              <p className="text-base font-semibold">Thant Hein Thwin</p>
              <p className="text-sm text-muted-foreground">Lead Software Engineer</p>
              <div className="mt-2">
                <AvailabilityStatus />
              </div>
            </div>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3.5 lg:ml-16">
            {/* outer link carries the 44px touch height, inner span the button look */}
            <Link href="/" className="group flex min-h-11 items-center">
              <span className="flex items-center gap-2 rounded border px-2 py-1 text-xs text-foreground/80 transition-colors group-hover:bg-muted-foreground/10 group-hover:text-foreground">
                See my work <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <a
              href="https://cal.com/thantheinthwin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-1 text-xs transition-colors hover:text-primary hover:underline hover:underline-offset-4"
            >
              Schedule a virtual coffee chat
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
