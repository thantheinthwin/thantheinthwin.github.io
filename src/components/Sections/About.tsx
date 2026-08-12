import SessionBase, { SectionBase } from "./Base";

const About: React.FC<Pick<SectionBase, "id">> = ({ id }) => {
  return (
    <SessionBase id={id} title="About">
      <p className="leading-relaxed text-balance text-foreground/80">
        A Lead Software Engineer with 5+ years of experience building scalable
        applications and leading teams. What am I so good at? I excel at taking
        complex problems and breaking them down into manageable pieces, then
        designing and implementing elegant solutions. I have a strong track
        record of delivering high-quality software on time and within budget. I
        am also a strong communicator and collaborator, able to work effectively
        with cross-functional teams.
      </p>
    </SessionBase>
  );
};

export default About;
