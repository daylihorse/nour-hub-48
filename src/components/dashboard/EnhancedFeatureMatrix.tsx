
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, AlertTriangle, Lock, Settings, Sparkles } from "lucide-react";
import { useTenantFeatures, FeatureDefinition } from "@/hooks/useTenantFeatures";

const EnhancedFeatureMatrix = () => {
  const { 
    isFeatureEnabled, 
    getAvailableFeatures, 
    getUnavailableFeatures,
    featureMatrix
  } = useTenantFeatures();
  
  const availableFeatures = getAvailableFeatures();
  const unavailableFeatures = getUnavailableFeatures();
  const enabledFeatures = availableFeatures.filter(f => isFeatureEnabled(f.id));
  
  const FeatureCard = ({ feature, isAvailable }: { feature: FeatureDefinition, isAvailable: boolean }) => {
    const isEnabled = isFeatureEnabled(feature.id);
    
    return (
      <div className={`
        border rounded-lg p-4 transition-all duration-200
        ${isEnabled 
          ? 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 hover:shadow-md' 
          : isAvailable 
            ? 'border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 hover:shadow-md hover:border-amber-300' 
            : 'border-gray-200 bg-gray-50 opacity-75'
        }
      `}>
        <div className="flex items-start gap-3">
          <div className={`
            flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
            ${isEnabled 
              ? 'bg-green-100 text-green-600' 
              : isAvailable 
                ? 'bg-amber-100 text-amber-600'
                : 'bg-gray-100 text-gray-400'
            }
          `}>
            {isEnabled ? (
              <Check className="h-4 w-4" />
            ) : isAvailable ? (
              <AlertTriangle className="h-4 w-4" />
            ) : (
              <Lock className="h-4 w-4" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm truncate">{feature.name}</h4>
              {isEnabled ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs px-2 py-0.5">
                  Active
                </Badge>
              ) : isAvailable ? (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs px-2 py-0.5">
                  Available
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-gray-100 text-gray-500 border-gray-200 text-xs px-2 py-0.5">
                  Locked
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{feature.description}</p>
            
            {isAvailable && !isEnabled && (
              <Button size="sm" variant="outline" className="h-7 text-xs border-amber-200 hover:bg-amber-50">
                <Settings className="h-3 w-3 mr-1" />
                Enable
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <Card className="shadow-brown hover:shadow-brown-lg transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brown-600" />
            Feature Management
          </CardTitle>
          <Badge variant="outline" className="bg-brown-50 text-brown-700 border-brown-200">
            {enabledFeatures.length}/{availableFeatures.length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-700">{enabledFeatures.length}</div>
            <div className="text-xs text-green-600">Active</div>
          </div>
          <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="text-2xl font-bold text-amber-700">{availableFeatures.length - enabledFeatures.length}</div>
            <div className="text-xs text-amber-600">Available</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-700">{unavailableFeatures.length}</div>
            <div className="text-xs text-gray-600">Locked</div>
          </div>
        </div>
        
        {/* Feature Grid */}
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

export default EnhancedFeatureMatrix;
