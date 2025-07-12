import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Blogs() {
  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Blog Posts</h1>
        <p className="text-lg text-muted-foreground">
          Thoughts, tutorials, and insights about software development
        </p>
      </div>

      <Card className="bg-card/50 border-border/20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80 leading-relaxed">
            I'm working on some interesting blog posts about modern web
            development, software architecture, and best practices. Check back
            soon for updates!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
