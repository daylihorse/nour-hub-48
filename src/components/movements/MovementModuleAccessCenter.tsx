
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, X, TruckIcon } from "lucide-react";

const MovementModuleAccessCenter: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TruckIcon className="h-6 w-6 mr-2" />
          Movement Module Access Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Configure movement tracking module features and access controls.
        </p>
      </CardContent>
    </Card>
  );
};

export default MovementModuleAccessCenter;
