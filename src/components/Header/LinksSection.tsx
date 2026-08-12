import { Link } from "./Link";

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
      {links.map((link) => (
        <Link key={link.label} label={link.label} url={link.url} />
      ))}
    </div>
  );
};
