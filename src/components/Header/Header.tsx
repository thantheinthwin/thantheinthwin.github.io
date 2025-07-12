import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const Header = () => {
  return (
    <header className="flex justify-between items-center py-8">
      <div className="flex items-center gap-6">
        <Avatar className="size-16 ring-2 ring-border/20">
          <AvatarImage src="/profile.jpg" />
          <AvatarFallback className="text-lg font-semibold">THT</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Thant Hein Thwin
          </h1>
          <p className="text-lg text-muted-foreground mt-1">
            Full Stack Software Engineer
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span>Available for work</span>
      </div>
    </header>
  );
};
