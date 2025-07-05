import { HTMLAttributes } from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
const Contact: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <Card
      className={cn(
        "relative group cursor-pointer transition-all duration-500 hover:invert",
        props.className
      )}
    >
      <div className="absolute top-2 right-2 group-hover:top-0 group-hover:right-0 transition-all duration-300">
        <ArrowUpRight className="w-16 h-16" strokeWidth={1} />
      </div>
      <CardContent className="text-4xl my-auto font-semibold">
        Get In Touch!
      </CardContent>
    </Card>
  );
};

export default Contact;
