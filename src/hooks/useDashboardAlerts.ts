
import { useTenantFeatures } from "./useTenantFeatures";

export const useDashboardAlerts = () => {
  const { isFeatureEnabled } = useTenantFeatures();

  const departments = [
    { feature: "horses", alerts: 3 },
    { feature: null, alerts: 0 }, // clients
    { feature: "laboratory", alerts: 7 },
    { feature: "clinic", alerts: 2 },
    { feature: "pharmacy", alerts: 8 },
    { feature: "finance", alerts: 5 },
    { feature: "hr", alerts: 0 },
    { feature: "inventory", alerts: 8 },
    { feature: "marketplace", alerts: 0 },
    { feature: null, alerts: 4 }, // movements
    { feature: "training", alerts: 0 },
    { feature: "riding-reservations", alerts: 3 },
    { feature: "stable-rooms", alerts: 2 },
    { feature: "maintenance", alerts: 1 },
    { feature: "messages", alerts: 0 }
  ];

  const totalAlerts = departments
    .filter(dept => !dept.feature || isFeatureEnabled(dept.feature))
    .reduce((sum, dept) => sum + dept.alerts, 0);

  return { totalAlerts, departments };
};
