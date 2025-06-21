
import { useState, useEffect } from 'react';

export const useDashboardAlerts = () => {
  const [totalAlerts, setTotalAlerts] = useState(0);

  useEffect(() => {
    // Mock alert data
    setTotalAlerts(3);
  }, []);

  return {
    totalAlerts
  };
};
