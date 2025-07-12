export const AvailabilityStatus: React.FC = () => {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div className="relative flex items-center w-4 h-4 justify-center">
        <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping"></span>
        <span className="relative inline-flex w-2 h-2 bg-green-500 rounded-full"></span>
      </div>
      <span>Available for work</span>
    </div>
  );
};
