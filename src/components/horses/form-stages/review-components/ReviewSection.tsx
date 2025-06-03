
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReviewSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ReviewSection = ({ title, icon, children }: ReviewSectionProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {children}
      </CardContent>
    </Card>
  );
};

export default ReviewSection;
