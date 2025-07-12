import { Download } from "lucide-react";

export type Section =
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "blogs"
  | "links";

export interface SectionBase extends React.PropsWithChildren {
  id: Section;
  title: string;
}

const SessionBase: React.FC<SectionBase> = ({ id, title, children }) => {
  return (
    <section id={id} className="grid gap-4 py-6">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">{title}</h2>
        {id === "about" && (
          <a
            href="/resume/Thant Hein Thwin.pdf"
            download
            className="flex items-center gap-2 text-xs text-foreground/80 hover:text-foreground transition-colors border px-2 py-1 rounded hover:bg-muted-foreground/10"
          >
            Resume <Download className="w-4 h-4" />
          </a>
        )}
      </div>
      {children}
    </section>
  );
};

export default SessionBase;
