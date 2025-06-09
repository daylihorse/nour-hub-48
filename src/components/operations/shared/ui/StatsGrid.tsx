
import { ReactNode } from "react";

interface StatsGridProps {
  children: ReactNode;
  columns?: number;
  className?: string;
}

const StatsGrid = ({ children, columns = 4, className = "" }: StatsGridProps) => {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-4",
    5: "grid-cols-1 md:grid-cols-5",
    6: "grid-cols-1 md:grid-cols-6"
  };

  return (
    <div className={`grid ${gridClasses[columns as keyof typeof gridClasses]} gap-4 ${className}`}>
      {children}
    </div>
  );
};

export default StatsGrid;
