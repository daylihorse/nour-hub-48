
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, Lock } from "lucide-react";
import { useTenantFeatures, FeatureDefinition } from "@/hooks/useTenantFeatures";

const FeatureMatrix = () => {
  const { 
    isFeatureEnabled, 
    getAvailableFeatures, 
    getUnavailableFeatures,
    featureMatrix
  } = useTenantFeatures();
  
  const availableFeatures = getAvailableFeatures();
  const unavailableFeatures = getUnavailableFeatures();
  
  const FeatureCard = ({ feature, isAvailable }: { feature: FeatureDefinition, isAvailable: boolean }) => {
    const isEnabled = isFeatureEnabled(feature.id);
    
    return (
      <div className={`
        border rounded-md p-3 flex items-start gap-3
        ${isEnabled ? 'border-green-200 bg-green-50' : isAvailable ? 'border-muted' : 'border-gray-200 bg-gray-50'}
      `}>
        <div className={`
          flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center
          ${isEnabled 
            ? 'bg-green-100 text-green-600' 
            : isAvailable 
              ? 'bg-amber-100 text-amber-600'
              : 'bg-gray-100 text-gray-400'
          }
        `}>
          {isEnabled ? (
            <Check className="h-3 w-3" />
          ) : isAvailable ? (
            <AlertTriangle className="h-3 w-3" />
          ) : (
            <Lock className="h-3 w-3" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-sm truncate">{feature.name}</h4>
            {isEnabled ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">Active</Badge>
            ) : isAvailable ? (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">Available</Badge>
            ) : (
              <Badge variant="outline" className="bg-gray-100 text-gray-500 border-gray-200 text-xs">Locked</Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">{feature.description}</p>
        </div>
      </div>
    );
  };
  
  return (
    <Card className="shadow-sm h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Feature Matrix</CardTitle>
        <CardDescription>
          Features available based on your subscription tier
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto">
          {Object.values(featureMatrix).map((feature) => (
            <FeatureCard 
              key={feature.id}
              feature={feature}
              isAvailable={availableFeatures.some(f => f.id === feature.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureMatrix;
