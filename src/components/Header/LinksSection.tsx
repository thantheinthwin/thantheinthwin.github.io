import { Link } from "./Link";

interface SocialLink {
  label: string;
  url: string;
  className?: string;
}

const links: SocialLink[] = [
  {
    // phones only: on desktop the sidebar's blog card already links to the list
    label: "Blog",
    url: "/blogs",
    className: "md:hidden",
  },
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
      {links.map((link) => (
        <Link
          key={link.label}
          label={link.label}
          url={link.url}
          className={link.className}
        />
      ))}
    </div>
  );
};
