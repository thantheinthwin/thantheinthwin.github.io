import { ArrowUpRight } from "lucide-react";

interface LinkProps {
  label: string;
  url: string;
}

export const Link: React.FC<LinkProps> = ({ label, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs flex items-center justify-between gap-1 w-fit hover:underline hover:underline-offset-4"
    >
      {label}
      <ArrowUpRight className="w-4 h-4" />
    </a>
  );
};
