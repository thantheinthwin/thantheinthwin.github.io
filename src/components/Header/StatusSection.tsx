import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic imports for code splitting
const AvailabilityStatus = dynamic(
  () =>
    import("./AvailabilityStatus").then((mod) => ({
      default: mod.AvailabilityStatus,
    })),
  {
    loading: () => (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="w-4 h-4 bg-muted rounded-full animate-pulse"></div>
        <div className="h-4 bg-muted rounded animate-pulse w-32"></div>
      </div>
    ),
    ssr: true,
  }
);

const LinksSection = dynamic(
  () => import("./LinksSection").then((mod) => ({ default: mod.LinksSection })),
  {
    loading: () => (
      <div className="flex gap-1 items-baseline text-xs">
        <div className="mr-2 h-3 bg-muted rounded animate-pulse w-8"></div>
        <div className="flex gap-1">
          <div className="h-4 bg-muted rounded animate-pulse w-16"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-20"></div>
        </div>
      </div>
    ),
    ssr: true,
  }
);

export const StatusSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 md:items-end">
      <Suspense
        fallback={
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-4 h-4 bg-muted rounded-full animate-pulse"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-32"></div>
          </div>
        }
      >
        <AvailabilityStatus />
      </Suspense>

      <Suspense
        fallback={
          <div className="flex gap-1 items-baseline text-xs">
            <div className="mr-2 h-3 bg-muted rounded animate-pulse w-8"></div>
            <div className="flex gap-1">
              <div className="h-4 bg-muted rounded animate-pulse w-16"></div>
              <div className="h-4 bg-muted rounded animate-pulse w-20"></div>
            </div>
          </div>
        }
      >
        <LinksSection />
      </Suspense>
    </div>
  );
};
