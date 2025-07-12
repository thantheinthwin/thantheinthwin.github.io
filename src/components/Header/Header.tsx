import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic imports for code splitting
const ProfileSection = dynamic(
  () =>
    import("./ProfileSection").then((mod) => ({ default: mod.ProfileSection })),
  {
    loading: () => (
      <div className="flex items-center gap-6">
        <div className="size-14 bg-muted rounded-full animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-5 bg-muted rounded animate-pulse w-32"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-48"></div>
          <div className="h-3 bg-muted rounded animate-pulse w-40"></div>
        </div>
      </div>
    ),
    ssr: true,
  }
);

const StatusSection = dynamic(
  () =>
    import("./StatusSection").then((mod) => ({ default: mod.StatusSection })),
  {
    loading: () => (
      <div className="flex flex-col gap-2 items-end">
        <div className="h-4 bg-muted rounded animate-pulse w-32"></div>
        <div className="h-3 bg-muted rounded animate-pulse w-24"></div>
      </div>
    ),
    ssr: true,
  }
);

export const Header: React.FC = () => {
  return (
    <header className="flex flex-col md:flex-row gap-4 justify-between md:items-end pb-6">
      <Suspense
        fallback={
          <div className="flex items-center gap-6">
            <div className="size-14 bg-muted rounded-full animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-5 bg-muted rounded animate-pulse w-32"></div>
              <div className="h-4 bg-muted rounded animate-pulse w-48"></div>
              <div className="h-3 bg-muted rounded animate-pulse w-40"></div>
            </div>
          </div>
        }
      >
        <ProfileSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="flex flex-col gap-2 items-end">
            <div className="h-4 bg-muted rounded animate-pulse w-32"></div>
            <div className="h-3 bg-muted rounded animate-pulse w-24"></div>
          </div>
        }
      >
        <StatusSection />
      </Suspense>
    </header>
  );
};
