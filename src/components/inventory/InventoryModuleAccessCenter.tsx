
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, X, Package } from "lucide-react";

const InventoryModuleAccessCenter: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Package className="h-6 w-6 mr-2" />
          Inventory Module Access Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Configure inventory module features and access controls.
        </p>
      </CardContent>
    </Card>
  );
};

export default InventoryModuleAccessCenter;
