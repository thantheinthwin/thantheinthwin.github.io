import { AvailabilityStatus } from "./AvailabilityStatus";
import { LinksSection } from "./LinksSection";

export const StatusSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 md:items-end">
      <AvailabilityStatus />
      <LinksSection />
    </div>
  );
};
