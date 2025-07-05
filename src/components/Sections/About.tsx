import { HTMLAttributes } from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";

const About: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default About;
