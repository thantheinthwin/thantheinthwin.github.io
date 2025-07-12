import { ArrowUpRight } from "lucide-react";

const CoffeeChat: React.FC = () => {
  return (
    <a
      href="https://cal.com/thantheinthwin"
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border rounded h-fit max-w-96 group hover:invert transition-all duration-300 bg-background"
    >
      <div className="flex items-center justify-between gap-2 text-primary group-hover:underline group-hover:underline-offset-4">
        Schedule a virtual coffee chat
        <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        Open to connect, share ideas, or discuss opportunities.
      </p>
    </a>
  );
};

export default CoffeeChat;
