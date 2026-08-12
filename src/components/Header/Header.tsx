import { ProfileSection } from "./ProfileSection";
import { StatusSection } from "./StatusSection";

export const Header: React.FC = () => {
  return (
    <header className="flex flex-col md:flex-row gap-4 justify-between md:items-end pb-6">
      <ProfileSection />
      <StatusSection />
    </header>
  );
};
