import SessionBase, { SectionBase } from "./Base";

const About: React.FC<Pick<SectionBase, "id">> = ({ id }) => {
  return (
    <SessionBase id={id} title="About">
      <p className="leading-relaxed text-balance text-foreground/80">
        Mid-Senior Full Stack Engineer with 4+ years of experience building
        enterprise-scale applications across React, Next.js, Node.js, and Go.
        Led development of high-traffic web platforms, microservices
        architectures, and cloud-native solutions. Expert in TypeScript,
        distributed systems, and performance optimization with a track record of
        shipping production-ready applications that serve millions of users.
      </p>
    </SessionBase>
  );
};

export default About;
