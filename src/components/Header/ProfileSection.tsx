import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCallback } from "react";
import { toast } from "sonner";

interface Profile {
  name: string;
  title: string;
  email: string;
  avatar: string;
}

const profile: Profile = {
  name: "Thant Hein Thwin",
  title: "Full Stack Software Engineer",
  email: "thantheinthwin.dev@gmail.com",
  avatar: "/profile.png",
};

export const ProfileSection: React.FC = () => {
  const handleEmailClick = useCallback(async () => {
    const email = profile.email;
    try {
      await navigator.clipboard.writeText(email);
      toast.success("Email copied to clipboard!", {
        description: (
          <span className="text-xs text-foreground/60">
            You can now paste it anywhere
          </span>
        ),
        duration: 1000,
        position: "bottom-center",
        style: {
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
          borderRadius: "0.5rem",
        },
      });
    } catch {
      toast.error("Failed to copy email", {
        description: (
          <span className="text-xs text-foreground/60">
            Please copy manually: {profile.email}
          </span>
        ),
        duration: 1000,
        position: "bottom-center",
        style: {
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
        },
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-end flex-row-reverse md:flex-row gap-6">
      <Avatar className="size-14 ring-2 ring-border/20">
        <AvatarImage src={profile.avatar} />
        <AvatarFallback className="text-lg font-semibold">THT</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-lg font-semibold tracking-tight">{profile.name}</h1>
        <p className="text-sm text-muted-foreground">{profile.title}</p>
        <button
          onClick={handleEmailClick}
          className="text-xs text-foreground/80 hover:text-foreground hover:underline hover:underline-offset-2 transition-colors cursor-pointer"
        >
          {profile.email}
        </button>
      </div>
    </div>
  );
};
