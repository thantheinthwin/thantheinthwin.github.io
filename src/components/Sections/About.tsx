import SessionBase, { SectionBase } from "./Base";

const About: React.FC<Pick<SectionBase, "id">> = ({ id }) => {
  return (
    <SessionBase id={id} title="About">
      <p className="leading-relaxed text-balance text-foreground/80">
        Full-stack engineer with over 5 years building production web, mobile,
        and AI platforms. At Six Atomic, I owned the Garment Generation Agentic
        Engine and led the harness that ran multiple AI agents in production,
        using TDD, SOLID patterns, and evaluation graders to direct coding
        agents. I also cut AI cost by 70% and halved response time, and mentored
        senior engineers on AI-assisted development. I work across TypeScript,
        React, Node.js, Python, Golang, PostgreSQL, and AWS.
      </p>
    </SessionBase>
  );
};

export default About;
