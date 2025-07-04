
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

const LanguageToggle = () => {
  // Simplified component - language switching disabled for now
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2 transition-all duration-200"
      disabled
      title="Language switching temporarily disabled"
    >
      <Languages className="h-4 w-4" />
      <span className="font-medium">EN</span>
    </Button>
  );
};

export default LanguageToggle;
