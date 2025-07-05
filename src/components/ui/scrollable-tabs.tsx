
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
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex items-center w-full">
      {/* Left Arrow - Enhanced Size */}
      {showLeftArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 z-10 h-12 w-12 bg-white shadow-brown-lg border-2 border-brown-300 hover:bg-brown-50 hover:shadow-brown"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-6 w-6 text-brown-700" />
        </Button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className={cn(
          "flex overflow-x-auto scroll-smooth scrollbar-hide",
          showLeftArrow && "pl-14",
          showRightArrow && "pr-14",
          className
        )}
        onScroll={checkScrollButtons}
      >
        <div className="flex bg-brown-50 p-2 rounded-lg border-2 border-brown-300 shadow-brown-lg min-w-max">
          {children}
        </div>
      </div>

      {/* Right Arrow - Enhanced Size */}
      {showRightArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 z-10 h-12 w-12 bg-white shadow-brown-lg border-2 border-brown-300 hover:bg-brown-50 hover:shadow-brown"
          onClick={scrollRight}
        >
          <ChevronRight className="h-6 w-6 text-brown-700" />
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

  const handleClick = () => {
    onValueChange(value);
    onClick?.();
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-w-max",
        isSelected
          ? "bg-white text-brown-900 shadow-brown border-2 border-brown-300"
          : "text-brown-600 hover:bg-white/80 hover:text-brown-900 hover:shadow-sm",
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
    <div className={cn("mt-8 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}>
      {children}
    </div>
  );
};
