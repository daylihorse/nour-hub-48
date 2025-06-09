
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface DashboardSectionProps {
  title: string;
  children: ReactNode;
  headerActions?: ReactNode;
  className?: string;
}

const DashboardSection = ({ title, children, headerActions, className }: DashboardSectionProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          {headerActions}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardSection;
