
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
  maxTabsForRegular?: number; // Default: 5
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
  maxTabsForRegular = 5,
}) => {
  const [useScrollable, setUseScrollable] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current) return;

      // Count the number of tabs
      const tabTriggers = containerRef.current.querySelectorAll('[data-tab-trigger]');
      const tabCount = tabTriggers.length;

      // If we have more than maxTabsForRegular tabs, use scrollable
      if (tabCount > maxTabsForRegular) {
        setUseScrollable(true);
        return;
      }

      // Check if tabs would overflow on smaller screens
      const containerWidth = containerRef.current.offsetWidth;
      let totalTabWidth = 0;

      tabTriggers.forEach((tab) => {
        const tabElement = tab as HTMLElement;
        // Estimate tab width including padding and margins
        const textWidth = tabElement.textContent?.length || 0;
        const estimatedWidth = Math.max(textWidth * 8 + 40, 100); // min 100px per tab
        totalTabWidth += estimatedWidth;
      });

      // Add some buffer space for the tab container padding
      const needsScrollable = totalTabWidth > containerWidth - 100;
      setUseScrollable(needsScrollable);
    };

    // Initial check
    checkOverflow();

    // Check on resize
    const handleResize = () => checkOverflow();
    window.addEventListener('resize', handleResize);

    // Check when children change (tab count changes)
    const observer = new MutationObserver(checkOverflow);
    if (containerRef.current) {
      observer.observe(containerRef.current, { 
        childList: true, 
        subtree: true 
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [maxTabsForRegular, children]);

  return (
    <SmartTabsContext.Provider value={{ value, onValueChange, useScrollable }}>
      <div ref={containerRef} className={cn("w-full", className)}>
        {useScrollable ? (
          <ScrollableTabs value={value} onValueChange={onValueChange}>
            {children}
          </ScrollableTabs>
        ) : (
          <Tabs value={value} onValueChange={onValueChange}>
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

  return (
    <TabsList className={cn("grid w-full", className)} style={{
      gridTemplateColumns: `repeat(${React.Children.count(children)}, minmax(0, 1fr))`
    }}>
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
      className={className} 
      onClick={onClick}
      data-tab-trigger
    >
      {children}
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
    <TabsContent value={value} className={className}>
      {children}
    </TabsContent>
  );
};
