
import React, { useRef, useState, useEffect } from "react";
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

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkScrollButtons, 100);
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [children]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -240, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 240, behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex items-center w-full">
      {/* Left Arrow - Enhanced */}
      {showLeftArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 z-20 h-12 w-12 bg-white/95 shadow-brown border-brown-200 hover:bg-brown-50 hover:border-brown-300 hover:shadow-brown-lg transition-all duration-300 backdrop-blur-sm"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-5 w-5 text-brown-700" />
        </Button>
      )}

      {/* Scrollable Container - Enhanced */}
      <div
        ref={scrollContainerRef}
        className={cn(
          "flex overflow-x-auto scroll-smooth scrollbar-hide w-full transition-all duration-300",
          showLeftArrow && "pl-14",
          showRightArrow && "pr-14",
          className
        )}
        onScroll={checkScrollButtons}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="flex bg-gradient-to-r from-brown-50 to-brown-100/80 p-2 rounded-xl border border-brown-200 shadow-brown backdrop-blur-sm min-w-max h-14">
          {children}
        </div>
      </div>

      {/* Right Arrow - Enhanced */}
      {showRightArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 z-20 h-12 w-12 bg-white/95 shadow-brown border-brown-200 hover:bg-brown-50 hover:border-brown-300 hover:shadow-brown-lg transition-all duration-300 backdrop-blur-sm"
          onClick={scrollRight}
        >
          <ChevronRight className="h-5 w-5 text-brown-700" />
        </Button>
      )}
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
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

  const handleClick = () => {
    onValueChange(value);
    onClick?.();
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-6 py-2.5 text-sm font-medium ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-w-max relative group overflow-hidden",
        isSelected
          ? "bg-white text-brown-900 shadow-md border border-brown-300/50 font-semibold transform scale-105"
          : "text-brown-700 hover:bg-white/90 hover:text-brown-900 hover:shadow-sm hover:scale-[1.02]",
        "h-10 min-h-[2.5rem] mx-1", // Consistent height
        className
      )}
      onClick={handleClick}
    >
      <span className="relative z-10 px-1">
        {children}
      </span>
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-r from-brown-50/50 to-white/50 rounded-lg transition-opacity duration-300" />
      )}
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
    <div className={cn("mt-8 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-500 focus-visible:ring-offset-2", className)}>
      {children}
    </div>
  );
};
