
export interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  previousValue?: number;
  change?: number;
  changePercentage?: number;
  trend: 'up' | 'down' | 'stable';
  category: string;
  period: string;
  timestamp?: Date;
}

export interface AnalyticsInsight {
  id: string;
  title: string;
  description: string;
  type: 'alert' | 'recommendation' | 'trend';
  severity: 'critical' | 'high' | 'medium' | 'low';
  category?: string;
  dismissed: boolean;
  action?: string;
  data?: Record<string, any>;
  createdAt: Date;
}

// Export ReportTemplate and Dashboard from the .d.ts file
export * from './analytics.d';
