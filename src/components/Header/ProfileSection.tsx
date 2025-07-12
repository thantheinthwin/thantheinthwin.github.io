import Image from "next/image";
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
  avatar: "/profile.webp",
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
      <Image
        src={profile.avatar}
        alt="Profile"
        width={56}
        height={56}
        sizes="56px"
        priority
        fetchPriority="high"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        className="size-14 ring-2 ring-border/20 rounded-full object-cover"
      />
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
