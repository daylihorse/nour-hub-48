
import { useState, useEffect, useRef, memo } from "react";
import { useVirtualList } from "@/utils/performanceUtils";

interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  height: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

const VirtualizedList = memo(<T,>({
  items,
  itemHeight,
  height,
  renderItem,
  className = ""
}: VirtualizedListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { totalHeight, getVisibleItems } = useVirtualList(items, itemHeight, height);
  const { startIndex, items: visibleItems, offsetY } = getVisibleItems(scrollTop);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div key={startIndex + index} style={{ height: itemHeight }}>
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

VirtualizedList.displayName = "VirtualizedList";

export default VirtualizedList;
