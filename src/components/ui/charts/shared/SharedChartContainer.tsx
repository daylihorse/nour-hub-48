
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

interface SharedChartContainerProps {
  title: string;
  children: React.ReactNode;
  config?: any;
  className?: string;
}

const SharedChartContainer = ({ 
  title, 
  children, 
  config = {}, 
  className = "h-[300px]" 
}: SharedChartContainerProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className={className}>
          {children}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SharedChartContainer;
