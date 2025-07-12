import { ArrowUpRight } from "lucide-react";
import SessionBase, { SectionBase } from "./Base";

interface Link {
  label: string;
  url: string;
}

const links: Link[] = [
  {
    label: "Github",
    url: "https://github.com/thantheinthwin",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/thantheinthwin/",
  },
];

const Links: React.FC<Pick<SectionBase, "id">> = ({ id }) => {
  return (
    <SessionBase id={id} title="Links">
      <div className="grid gap-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-1 w-fit hover:underline hover:underline-offset-4"
          >
            {link.label}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        ))}
      </div>
    </SessionBase>
  );
};

export default Links;
