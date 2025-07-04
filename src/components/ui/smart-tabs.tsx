
import React, { useRef, useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  ScrollableTabs, 
  ScrollableTabsList, 
  ScrollableTabsTrigger, 
  ScrollableTabsContent 
} from "@/components/ui/scrollable-tabs";
import { cn } from "@/lib/utils";

interface SmartTabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  maxTabsForRegular?: number;
  forceScrollable?: boolean; // New prop to force scrollable mode
}

interface SmartTabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface SmartTabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface SmartTabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const SmartTabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
  useScrollable: boolean;
}>({
  value: "",
  onValueChange: () => {},
  useScrollable: false,
});

export const SmartTabs: React.FC<SmartTabsProps> = ({
  value,
  onValueChange,
  children,
  className,
  maxTabsForRegular = 4,
  forceScrollable = false,
}) => {
  const [useScrollable, setUseScrollable] = useState(forceScrollable);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Simplified logic - only check once on mount and when children change significantly
  useEffect(() => {
    if (forceScrollable) {
      setUseScrollable(true);
      setIsInitialized(true);
      return;
    }

    const checkTabMode = () => {
      if (!containerRef.current) return;

      // Count tabs more reliably
      const tabTriggers = React.Children.toArray(children).find(
        child => React.isValidElement(child) && child.type === SmartTabsList
      );
      
      if (!tabTriggers || !React.isValidElement(tabTriggers)) {
        setIsInitialized(true);
        return;
      }

      const tabCount = React.Children.count(tabTriggers.props.children);
      const shouldUseScrollable = tabCount > maxTabsForRegular;
      
      setUseScrollable(shouldUseScrollable);
      setIsInitialized(true);
    };

    // Only check once when component mounts
    if (!isInitialized) {
      checkTabMode();
    }
  }, [children, maxTabsForRegular, forceScrollable, isInitialized]);

  // Don't render until we've determined the mode to prevent switching
  if (!isInitialized) {
    return <div className="h-14 w-full animate-pulse bg-muted rounded-lg" />;
  }

  return (
    <SmartTabsContext.Provider value={{ value, onValueChange, useScrollable }}>
      <div ref={containerRef} className={cn("w-full", className)}>
        {useScrollable ? (
          <ScrollableTabs value={value} onValueChange={onValueChange} className="w-full">
            {children}
          </ScrollableTabs>
        ) : (
          <Tabs value={value} onValueChange={onValueChange} className="w-full">
            {children}
          </Tabs>
        )}
      </div>
    </SmartTabsContext.Provider>
  );
};

export const SmartTabsList: React.FC<SmartTabsListProps> = ({
  children,
  className,
}) => {
  const { useScrollable } = React.useContext(SmartTabsContext);

  if (useScrollable) {
    return (
      <ScrollableTabsList className={className}>
        {children}
      </ScrollableTabsList>
    );
  }

  const tabCount = React.Children.count(children);

  return (
    <TabsList 
      className={cn(
        "grid w-full h-12 p-1 bg-muted rounded-lg",
        className
      )} 
      style={{
        gridTemplateColumns: `repeat(${tabCount}, minmax(0, 1fr))`
      }}
    >
      {children}
    </TabsList>
  );
};

export const SmartTabsTrigger: React.FC<SmartTabsTriggerProps> = ({
  value,
  children,
  className,
  onClick,
}) => {
  const { useScrollable } = React.useContext(SmartTabsContext);

  if (useScrollable) {
    return (
      <ScrollableTabsTrigger value={value} className={className} onClick={onClick}>
        {children}
      </ScrollableTabsTrigger>
    );
  }

  return (
    <TabsTrigger 
      value={value} 
      className={cn(
        "relative h-10 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
        "data-[state=active]:bg-background data-[state=active]:shadow-sm",
        className
      )}
      onClick={onClick}
      data-tab-trigger
    >
      <span className="whitespace-nowrap">
        {children}
      </span>
    </TabsTrigger>
  );
};

export const SmartTabsContent: React.FC<SmartTabsContentProps> = ({
  value,
  children,
  className,
}) => {
  const { useScrollable } = React.useContext(SmartTabsContext);

  if (useScrollable) {
    return (
      <ScrollableTabsContent value={value} className={className}>
        {children}
      </ScrollableTabsContent>
    );
  }

  return (
    <TabsContent 
      value={value} 
      className={cn(
        "mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      {children}
    </TabsContent>
  );
};
