
import { TestValueStatus } from "../../AddTestResultDialog";

export const getStatusColor = (status: TestValueStatus | string) => {
  switch (status) {
    case 'critical-high': return 'text-red-800 bg-red-100 border-red-300';
    case 'very-high': return 'text-red-700 bg-red-50 border-red-200';
    case 'high': return 'text-orange-700 bg-orange-50 border-orange-200';
    case 'slightly-high': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    case 'normal': return 'text-green-700 bg-green-50 border-green-200';
    case 'slightly-low': return 'text-blue-700 bg-blue-50 border-blue-200';
    case 'low': return 'text-indigo-700 bg-indigo-50 border-indigo-200';
    case 'very-low': return 'text-purple-700 bg-purple-50 border-purple-200';
    case 'critical-low': return 'text-purple-800 bg-purple-100 border-purple-300';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export const getStatusLabel = (status: TestValueStatus | string): string => {
  switch (status) {
    case 'critical-high': return 'Critical High';
    case 'very-high': return 'Very High';
    case 'high': return 'High';
    case 'slightly-high': return 'Slightly High';
    case 'normal': return 'Normal';
    case 'slightly-low': return 'Slightly Low';
    case 'low': return 'Low';
    case 'very-low': return 'Very Low';
    case 'critical-low': return 'Critical Low';
    default: return 'Unknown';
  }
};

export const calculateStatus = (value: string, reference: string): TestValueStatus => {
  const numericValue = parseFloat(value);
  
  if (reference.includes('-')) {
    const [min, max] = reference.split('-').map(v => parseFloat(v.trim()));
    if (!isNaN(numericValue) && !isNaN(min) && !isNaN(max)) {
      const range = max - min;
      const lowerThreshold = min - range * 0.1; // 10% below min
      const upperThreshold = max + range * 0.1; // 10% above max
      
      // Calculate relative position
      if (numericValue < min) {
        const belowMin = min - numericValue;
        const percentBelow = belowMin / range;
        
        if (numericValue < lowerThreshold && percentBelow > 1.0) {
          return 'critical-low';
        } else if (percentBelow > 0.5) {
          return 'very-low';
        } else if (percentBelow > 0.2) {
          return 'low';
        } else {
          return 'slightly-low';
        }
      } else if (numericValue > max) {
        const aboveMax = numericValue - max;
        const percentAbove = aboveMax / range;
        
        if (numericValue > upperThreshold && percentAbove > 1.0) {
          return 'critical-high';
        } else if (percentAbove > 0.5) {
          return 'very-high';
        } else if (percentAbove > 0.2) {
          return 'high';
        } else {
          return 'slightly-high';
        }
      } else {
        return 'normal';
      }
    }
  }
  
  return 'normal';
};
