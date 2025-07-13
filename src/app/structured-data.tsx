export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Thant Hein Thwin",
    jobTitle: "Full Stack Software Engineer",
    description:
      "Portfolio of Thant Hein Thwin, a Full Stack Software Engineer with expertise in React, Next.js, Node.js, and Golang",
    url: "https://thantheinthwin.vercel.app",
    image: "https://thantheinthwin.vercel.app/profile.webp",
    sameAs: [
      // Add your social media profiles here
      "https://github.com/thantheinthwin",
      "https://www.linkedin.com/in/thanthein/",
      // "https://twitter.com/yourusername"
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "Golang",
      "TypeScript",
      "JavaScript",
      "Full Stack Development",
      "Web Development",
      "Software Engineering",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Software Engineering",
    },
    alumniOf: {
      "@type": "Organization",
      name: "Greenwich University",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
