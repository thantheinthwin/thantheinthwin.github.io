import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic import for the Link component
const Link = dynamic(
  () => import("./Link").then((mod) => ({ default: mod.Link })),
  {
    loading: () => (
      <div className="h-4 bg-muted rounded animate-pulse w-16"></div>
    ),
    ssr: true,
  }
);

interface SocialLink {
  label: string;
  url: string;
}

const links: SocialLink[] = [
  {
    label: "Github",
    url: "https://github.com/thantheinthwin",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/thanthein/",
  },
];

export const LinksSection: React.FC = () => {
  return (
    <div className="flex gap-1 items-baseline text-xs">
      <span className="mr-2 font-semibold">Links</span>
      <Suspense
        fallback={
          <div className="flex gap-1">
            <div className="h-4 bg-muted rounded animate-pulse w-16"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-20"></div>
          </div>
        }
      >
        {links.map((link) => (
          <Link key={link.label} label={link.label} url={link.url} />
        ))}
      </Suspense>
    </div>
  );
};
