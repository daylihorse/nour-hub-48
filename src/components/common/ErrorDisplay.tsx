
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  error?: Error | string;
  onRetry?: () => void;
  onGoHome?: () => void;
  showDetails?: boolean;
}

const ErrorDisplay = ({ 
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again or contact support if the problem persists.",
  error,
  onRetry,
  onGoHome,
  showDetails = false
}: ErrorDisplayProps) => {
  const errorMessage = typeof error === 'string' ? error : error?.message;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{message}</p>
        
        {showDetails && errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm font-medium text-red-800">Error Details:</p>
            <p className="text-sm text-red-700 mt-1 font-mono">{errorMessage}</p>
          </div>
        )}

        <div className="flex gap-2">
          {onRetry && (
            <Button onClick={onRetry} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
          {onGoHome && (
            <Button onClick={onGoHome}>
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorDisplay;
