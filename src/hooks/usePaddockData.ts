
import { usePaddockService } from './usePaddockService';

export const usePaddockData = () => {
  const { usePaddocks } = usePaddockService();
  const { data: paddocks = [], isLoading, error } = usePaddocks();

  return {
    paddocks,
    isLoading,
    error
  };
};
