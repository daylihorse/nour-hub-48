
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, X, Rabbit } from "lucide-react";

const RidingReservationsModuleAccessCenter: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Rabbit className="h-6 w-6 mr-2" />
          Riding Reservations Module Access Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Configure riding reservations module features and access controls.
        </p>
      </CardContent>
    </Card>
  );
};

export default RidingReservationsModuleAccessCenter;
