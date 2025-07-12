import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const About: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <p className="text-foreground/80 leading-relaxed text-balance text-lg">
        Fullstack Software Engineer with expertise in React, Next.js, Node.js,
        and Golang. Proven ability to build scalable web and mobile apps, backed
        by strong skills in TypeScript, SQL/NoSQL databases, and cloud-ready
        architecture. Focused on delivering clean, efficient solutions to
        complex problems.
      </p>
    </div>
  );
};

export default About;
