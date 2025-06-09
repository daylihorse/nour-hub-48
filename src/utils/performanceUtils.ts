
import { useMemo, useCallback } from 'react';

// Performance optimization utilities for operations components
export const useOptimizedCalculation = <T>(
  calculation: () => T,
  dependencies: any[]
): T => {
  return useMemo(calculation, dependencies);
};

export const useOptimizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  dependencies: any[]
): T => {
  return useCallback(callback, dependencies);
};

// Debounce utility for search and filtering
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for performance-critical operations
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Memoization utility for expensive computations
export const memoize = <T extends (...args: any[]) => any>(
  fn: T
): T => {
  const cache = new Map();
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

// Virtual scrolling utility for large lists
export const useVirtualScrolling = (
  itemCount: number,
  itemHeight: number,
  containerHeight: number
) => {
  return useMemo(() => {
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const bufferSize = Math.min(10, Math.floor(visibleCount / 2));
    
    return {
      visibleCount: visibleCount + bufferSize * 2,
      startIndex: 0,
      endIndex: Math.min(itemCount, visibleCount + bufferSize * 2)
    };
  }, [itemCount, itemHeight, containerHeight]);
};
