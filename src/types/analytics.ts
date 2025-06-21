
export interface AnalyticsInsight {
  id: string;
  title: string;
  description: string;
  type: 'alert' | 'recommendation' | 'trend';
  severity: 'critical' | 'high' | 'medium' | 'low';
  dismissed: boolean;
  action?: string;
  createdAt: Date;
}
