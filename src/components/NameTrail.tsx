import Image from "next/image";
import Link from "next/link";

interface NameTrailProps {
  // `current` marks the section as the page you're on (e.g. the blog index),
  // so it renders as text instead of a link to itself.
  section: { label: string; href: string; current?: boolean };
  className?: string;
}

const linkClassName =
  "flex min-h-11 items-center hover:underline hover:underline-offset-4";

// Top of inner pages: tells a visitor from search whose site this is and
// links back to the portfolio, in place of a site-wide nav bar.
export const NameTrail: React.FC<NameTrailProps> = ({ section, className }) => {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex w-fit items-center gap-2 text-sm">
        <li>
          <Link href="/" className={`${linkClassName} gap-2 font-semibold`}>
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
        </li>
        <li className="flex items-center gap-2 text-muted-foreground">
          <span aria-hidden="true">/</span>
          {section.current ? (
            <span aria-current="page" className="flex min-h-11 items-center">
              {section.label}
            </span>
          ) : (
            <Link href={section.href} className={`${linkClassName} hover:text-foreground`}>
              {section.label}
            </Link>
          )}
        </li>
      </ol>
    </nav>
  );
};
