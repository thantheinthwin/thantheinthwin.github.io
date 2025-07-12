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
    <section id={id} className="grid gap-4">
      <h2 className="font-semibold">{title}</h2>
      {children}
    </section>
  );
};

export default SessionBase;
