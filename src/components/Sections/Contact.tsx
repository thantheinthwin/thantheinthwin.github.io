import { HTMLAttributes } from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const Contact: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <Card
      className={cn(
        "relative group cursor-pointer transition-all duration-300 hover-lift bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40",
        props.className
      )}
    >
      <div className="absolute top-3 right-3 group-hover:top-2 group-hover:right-2 transition-all duration-300">
        <ArrowUpRight
          className="w-6 h-6 text-primary/60 group-hover:text-primary"
          strokeWidth={1.5}
        />
      </div>
      <CardContent className="text-2xl font-semibold text-center py-8 group-hover:text-primary transition-colors">
        Get In Touch!
      </CardContent>
    </Card>
  );
};

export default Contact;
