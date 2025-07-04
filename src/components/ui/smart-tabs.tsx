
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
  maxTabsForRegular?: number; // Default: 4 (reduced from 5)
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
  maxTabsForRegular = 4, // Reduced for better responsiveness
}) => {
  const [useScrollable, setUseScrollable] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current) return;

      // Count the number of tabs
      const tabTriggers = containerRef.current.querySelectorAll('[data-tab-trigger]');
      const tabCount = tabTriggers.length;

      // Use more intelligent logic for scrollable vs regular tabs
      const shouldUseScrollable = tabCount > maxTabsForRegular;
      
      // Also check screen size - use scrollable on smaller screens with fewer tabs
      const isSmallScreen = window.innerWidth < 768; // md breakpoint
      const isVerySmallScreen = window.innerWidth < 640; // sm breakpoint
      
      if (isVerySmallScreen && tabCount > 3) {
        setUseScrollable(true);
      } else if (isSmallScreen && tabCount > maxTabsForRegular - 1) {
        setUseScrollable(true);
      } else {
        setUseScrollable(shouldUseScrollable);
      }
    };

    // Initial check
    checkOverflow();

    // Check on resize with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkOverflow, 150);
    };
    
    window.addEventListener('resize', handleResize);

    // Check when children change
    const observer = new MutationObserver(checkOverflow);
    if (containerRef.current) {
      observer.observe(containerRef.current, { 
        childList: true, 
        subtree: true 
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      observer.disconnect();
    };
  }, [maxTabsForRegular, children]);

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
        "grid w-full h-14 p-1.5 bg-gradient-to-r from-brown-50 to-brown-100/80 border border-brown-200 rounded-xl shadow-brown backdrop-blur-sm",
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
        "relative h-11 px-6 py-2.5 text-sm font-medium text-brown-700 rounded-lg transition-all duration-300 ease-out",
        "hover:bg-white/90 hover:text-brown-900 hover:shadow-sm hover:scale-[1.02]",
        "data-[state=active]:bg-white data-[state=active]:text-brown-900 data-[state=active]:shadow-md data-[state=active]:scale-105 data-[state=active]:font-semibold",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-500 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "group overflow-hidden",
        className
      )}
      onClick={onClick}
      data-tab-trigger
    >
      <span className="relative z-10 whitespace-nowrap">
        {children}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-brown-50/50 to-white/50 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300 rounded-lg" />
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
        "mt-8 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-500 focus-visible:ring-offset-2",
        className
      )}
    >
      {children}
    </TabsContent>
  );
};
