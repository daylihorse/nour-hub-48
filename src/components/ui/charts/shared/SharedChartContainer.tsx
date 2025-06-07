
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { ReactElement, JSXElementConstructor } from "react";

interface SharedChartContainerProps {
  title: string;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
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
