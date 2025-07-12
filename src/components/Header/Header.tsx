import { ArrowUpRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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

export const Header = () => {
  return (
    <header className="flex justify-between items-end pb-6">
      <div className="flex items-center gap-6">
        <Avatar className="size-14 ring-2 ring-border/20">
          <AvatarImage src="/profile.jpg" />
          <AvatarFallback className="text-lg font-semibold">THT</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-lg font-semibold tracking-tight">
            Thant Hein Thwin
          </h1>
          <p className="text-sm text-muted-foreground">
            Full Stack Software Engineer
          </p>
          <span className="text-xs text-foreground/80">
            thantheinthwin.dev@gmail.com
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-end">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="relative flex items-center w-4 h-4 justify-center">
            <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex w-2 h-2 bg-green-500 rounded-full"></span>
          </div>
          <span>Available for work</span>
        </div>
        <div className="flex gap-1 items-baseline">
          <span className="text-sm mr-1">Links</span>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs flex items-center justify-between gap-1 w-fit hover:underline hover:underline-offset-4"
            >
              {link.label}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};
