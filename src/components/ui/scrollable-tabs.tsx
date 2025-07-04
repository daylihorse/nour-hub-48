
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollableTabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface ScrollableTabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface ScrollableTabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const ScrollableTabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
}>({
  value: "",
  onValueChange: () => {},
});

export const ScrollableTabs: React.FC<ScrollableTabsProps> = ({
  value,
  onValueChange,
  children,
  className,
}) => {
  return (
    <ScrollableTabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn("w-full", className)}>
        {children}
      </div>
    </ScrollableTabsContext.Provider>
  );
};

export const ScrollableTabsList: React.FC<ScrollableTabsListProps> = ({
  children,
  className,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const checkScrollButtons = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const newShowLeft = scrollLeft > 5; // Small threshold to avoid flickering
    const newShowRight = scrollLeft < scrollWidth - clientWidth - 5;
    
    setShowLeftArrow(newShowLeft);
    setShowRightArrow(newShowRight);
  }, []);

  // Initialize scroll state
  useEffect(() => {
    const timer = setTimeout(() => {
      checkScrollButtons();
      setIsInitialized(true);
    }, 100); // Small delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, [checkScrollButtons]);

  // Handle resize with debouncing
  useEffect(() => {
    if (!isInitialized) return;

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkScrollButtons, 150);
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [checkScrollButtons, isInitialized]);

  const scrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="relative flex items-center w-full">
      {/* Left Arrow */}
      {showLeftArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 z-10 h-10 w-10 bg-background shadow-md border hover:bg-accent"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className={cn(
          "flex overflow-x-auto scroll-smooth scrollbar-hide w-full",
          showLeftArrow && "pl-12",
          showRightArrow && "pr-12",
          className
        )}
        onScroll={checkScrollButtons}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="flex bg-muted p-1 rounded-lg min-w-max h-12">
          {children}
        </div>
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 z-10 h-10 w-10 bg-background shadow-md border hover:bg-accent"
          onClick={scrollRight}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export const ScrollableTabsTrigger: React.FC<ScrollableTabsTriggerProps> = ({
  value,
  children,
  className,
  onClick,
}) => {
  const { value: selectedValue, onValueChange } = React.useContext(ScrollableTabsContext);
  const isSelected = selectedValue === value;

  const handleClick = useCallback(() => {
    onValueChange(value);
    onClick?.();
  }, [value, onValueChange, onClick]);

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-w-max mx-1",
        isSelected
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-background/50",
        className
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export const ScrollableTabsContent: React.FC<{
  value: string;
  children: React.ReactNode;
  className?: string;
}> = ({ value, children, className }) => {
  const { value: selectedValue } = React.useContext(ScrollableTabsContext);

  if (selectedValue !== value) {
    return null;
  }

  return (
    <div className={cn("mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}>
      {children}
    </div>
  );
};
