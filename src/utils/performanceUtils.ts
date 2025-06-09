
import { memo, useMemo, useCallback, useRef, useEffect } from 'react';

// Memoization utility for expensive calculations
export const createMemoizedCalculation = <T, R>(
  calculation: (input: T) => R,
  getDependencies: (input: T) => any[]
) => {
  const cache = new Map<string, R>();
  
  return (input: T): R => {
    const deps = getDependencies(input);
    const cacheKey = JSON.stringify(deps);
    
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)!;
    }
    
    const result = calculation(input);
    cache.set(cacheKey, result);
    
    // Clean cache if it gets too large
    if (cache.size > 1000) {
      const keys = Array.from(cache.keys());
      keys.slice(0, 500).forEach(key => cache.delete(key));
    }
    
    return result;
  };
};

// Debounce utility for search and filters
export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  return useCallback((...args: Parameters<T>) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(...args), delay);
  }, [callback, delay]) as T;
};

// Throttle utility for scroll and resize handlers
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastRun = useRef<number>(0);
  
  return useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = now;
    }
  }, [callback, delay]) as T;
};

// Virtual scrolling utility for large lists
export const useVirtualList = <T>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) => {
  return useMemo(() => {
    const visibleCount = Math.ceil(containerHeight / itemHeight) + 2; // Buffer
    const totalHeight = items.length * itemHeight;
    
    return {
      totalHeight,
      visibleCount,
      getVisibleItems: (scrollTop: number) => {
        const startIndex = Math.floor(scrollTop / itemHeight);
        const endIndex = Math.min(startIndex + visibleCount, items.length);
        
        return {
          startIndex,
          endIndex,
          items: items.slice(startIndex, endIndex),
          offsetY: startIndex * itemHeight
        };
      }
    };
  }, [items, itemHeight, containerHeight]);
};

// Optimized memo component wrapper
export const createOptimizedComponent = <P extends object>(
  Component: React.ComponentType<P>,
  propsAreEqual?: (prevProps: P, nextProps: P) => boolean
) => {
  return memo(Component, propsAreEqual);
};

// Performance measurement decorator
export const withPerformanceTracking = <P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) => {
  return memo((props: P) => {
    const startTime = performance.now();
    
    useEffect(() => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (renderTime > 16) {
        console.warn(`Slow render: ${componentName} took ${renderTime.toFixed(2)}ms`);
      }
    });
    
    return <Component {...props} />;
  });
};
