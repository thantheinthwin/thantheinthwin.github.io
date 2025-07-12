import { SectionBase } from "@/types";

const About: React.FC<SectionBase> = ({ id }) => {
  return (
    <section id={id}>
      <h2 className="text-2xl font-bold mb-8">About</h2>
      <p className="text-foreground/80 leading-relaxed text-balance text">
        Fullstack Software Engineer with expertise in React, Next.js, Node.js,
        and Golang. Proven ability to build scalable web and mobile apps, backed
        by strong skills in TypeScript, SQL/NoSQL databases, and cloud-ready
        architecture. Focused on delivering clean, efficient solutions to
        complex problems.
      </p>
    </section>
  );
};

export default About;
