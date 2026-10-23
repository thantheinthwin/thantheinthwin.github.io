import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NameTrailProps {
  section: { label: string; href: string };
  className?: string;
}

// Top of inner pages: tells a visitor from search whose site this is and
// links back to the portfolio, in place of a site-wide nav bar.
export const NameTrail: React.FC<NameTrailProps> = ({ section, className }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex w-fit items-center gap-2 text-sm", className)}
    >
      <Link
        href="/"
        className="flex min-h-11 items-center gap-2 font-semibold hover:underline hover:underline-offset-4"
      >
        <Image
          src="/profile.webp"
          alt=""
          width={24}
          height={24}
          sizes="24px"
          className="size-6 rounded-full object-cover"
        />
        Thant Hein Thwin
      </Link>
      <span className="text-muted-foreground" aria-hidden="true">
        /
      </span>
      <Link
        href={section.href}
        className="flex min-h-11 items-center text-muted-foreground hover:text-primary transition-colors"
      >
        {section.label}
      </Link>
    </nav>
  );
};
