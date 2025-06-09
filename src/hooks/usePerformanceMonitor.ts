import { useEffect, useRef, useCallback } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
  timestamp: number;
}

export const usePerformanceMonitor = (componentName: string, enabled: boolean = false) => {
  const renderStartTime = useRef<number>();
  const metricsRef = useRef<PerformanceMetrics[]>([]);

  const startMeasure = useCallback(() => {
    if (!enabled) return;
    renderStartTime.current = performance.now();
  }, [enabled]);

  const endMeasure = useCallback(() => {
    if (!enabled || !renderStartTime.current) return;
    
    const renderTime = performance.now() - renderStartTime.current;
    const metric: PerformanceMetrics = {
      renderTime,
      componentName,
      timestamp: Date.now()
    };
    
    metricsRef.current.push(metric);
    
    // Keep only last 100 measurements
    if (metricsRef.current.length > 100) {
      metricsRef.current = metricsRef.current.slice(-100);
    }
    
    // Log slow renders (> 16ms)
    if (renderTime > 16) {
      console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
    }
  }, [enabled, componentName]);

  const getMetrics = useCallback(() => {
    return metricsRef.current;
  }, []);

  const getAverageRenderTime = useCallback(() => {
    if (metricsRef.current.length === 0) return 0;
    const total = metricsRef.current.reduce((sum, metric) => sum + metric.renderTime, 0);
    return total / metricsRef.current.length;
  }, []);

  useEffect(() => {
    startMeasure();
    return () => {
      endMeasure();
    };
  });

  return {
    getMetrics,
    getAverageRenderTime,
    startMeasure,
    endMeasure
  };
};
