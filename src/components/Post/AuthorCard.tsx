import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AvailabilityStatus } from "@/components/Header/AvailabilityStatus";

// Last thing on every post: who wrote it, and two ways to stay on the site.
export const AuthorCard: React.FC = () => {
  return (
    <aside aria-label="About the author" className="grid gap-3 rounded border p-4">
      <div className="flex items-center gap-3">
        <Image
          src="/profile.webp"
          alt=""
          width={40}
          height={40}
          sizes="40px"
          className="size-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold">Thant Hein Thwin</p>
          <p className="text-xs text-muted-foreground">Lead Software Engineer</p>
        </div>
      </div>
      <AvailabilityStatus />
      <div className="flex flex-wrap items-center gap-x-3.5">
        {/* outer link carries the 44px touch height, inner span the button look */}
        <Link href="/" className="group flex min-h-11 items-center">
          <span className="flex items-center gap-2 text-xs text-foreground/80 group-hover:text-foreground transition-colors border px-2 py-1 rounded group-hover:bg-muted-foreground/10">
            See my work <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
        <a
          href="https://cal.com/thantheinthwin"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center gap-1 text-xs hover:text-primary hover:underline hover:underline-offset-4 transition-colors"
        >
          Schedule a virtual coffee chat
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </aside>
  );
};
