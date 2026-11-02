export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Thant Hein Thwin",
    jobTitle: "Staff Software Engineer",
    description:
      "Portfolio of Thant Hein Thwin, a Staff Software Engineer building production web, mobile and AI platforms with TypeScript, React, Node.js, Python, Golang and AWS",
    url: "https://thantheinthwin.vercel.app",
    image: "https://thantheinthwin.vercel.app/profile.webp",
    sameAs: [
      // Add your social media profiles here
      "https://github.com/thantheinthwin",
      "https://www.linkedin.com/in/thanthein/",
      // "https://twitter.com/yourusername"
    ],
    knowsAbout: [
      "AI agent orchestration",
      "LLM integration",
      "TypeScript",
      "React",
      "Node.js",
      "Python",
      "Golang",
      "PostgreSQL",
      "AWS",
      "Full Stack Development",
    ],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "University of Greenwich" },
      { "@type": "CollegeOrUniversity", name: "Myanmar Institute of Information Technology" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
