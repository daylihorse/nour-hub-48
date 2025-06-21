
export interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  category: string;
  trend: 'up' | 'down' | 'stable';
  changePercentage?: number;
  period: string;
}

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
