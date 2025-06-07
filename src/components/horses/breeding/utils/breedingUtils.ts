
import { BREEDING_PRIORITIES } from '../constants/breedingConstants';

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case BREEDING_PRIORITIES.HIGH:
      return "destructive";
    case BREEDING_PRIORITIES.MEDIUM:
      return "default";
    case BREEDING_PRIORITIES.LOW:
      return "secondary";
    default:
      return "default";
  }
};

export const calculateProgressPercentage = (currentDay: number, totalDays: number): number => {
  return Math.round((currentDay / totalDays) * 100);
};

export const formatProgressText = (currentDay: number, totalDays: number): string => {
  return `Day ${currentDay}/${totalDays}`;
};

export const getStatusIcon = (status: string) => {
  // This function will be used in components that import the necessary icons
  return status;
};
