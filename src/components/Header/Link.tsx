import { ArrowRight, ArrowUpRight } from "lucide-react";
import NextLink from "next/link";

interface LinkProps {
  label: string;
  url: string;
}

const className =
  "text-xs flex items-center justify-between gap-1 w-fit hover:underline hover:underline-offset-4";

export const Link: React.FC<LinkProps> = ({ label, url }) => {
  // Pages on this site open in the same tab so the visit continues;
  // profiles elsewhere open in a new one.
  if (url.startsWith("/") && !url.startsWith("//")) {
    return (
      <NextLink href={url} className={className}>
        {label}
        <ArrowRight className="w-4 h-4" />
      </NextLink>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
      <ArrowUpRight className="w-4 h-4" />
    </a>
  );
};
