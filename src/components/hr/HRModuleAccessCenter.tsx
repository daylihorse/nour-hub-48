
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, X, Users } from "lucide-react";

const HRModuleAccessCenter: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-6 w-6 mr-2" />
          HR Module Access Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Configure HR module features and access controls.
        </p>
      </CardContent>
    </Card>
  );
};

export default HRModuleAccessCenter;
