import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const Header = () => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="size-12">
          <AvatarImage src="/profile.jpg" />
          <AvatarFallback>THT</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-xl font-semibold">Thant Hein Thwin</div>
          <div className="text-sm text-muted-foreground">
            Full Stack Software Engineer
          </div>
        </div>
      </div>
      <div>Available for work</div>
    </div>
  );
};
