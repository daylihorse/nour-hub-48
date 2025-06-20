
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
  timestamp: Date;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'financial' | 'operational' | 'training' | 'horse_management' | 'custom';
  type: 'table' | 'chart' | 'dashboard' | 'export';
  parameters: Record<string, any>;
  filters: ReportFilter[];
  charts: ChartConfig[];
  schedule?: ReportSchedule;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportFilter {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between' | 'in';
  value: any;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'multiselect';
}

export interface ChartConfig {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'gauge';
  dataSource: string;
  xAxis: string;
  yAxis: string | string[];
  groupBy?: string;
  aggregation?: 'sum' | 'avg' | 'count' | 'min' | 'max';
  colors: string[];
  options: Record<string, any>;
}

export interface ReportSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  dayOfWeek?: number;
  dayOfMonth?: number;
  time: string;
  recipients: string[];
  format: 'pdf' | 'excel' | 'csv';
}

export interface Dashboard {
  id: string;
  name: string;
  description?: string;
  category: string;
  widgets: DashboardWidget[];
  layout: DashboardLayout;
  filters: GlobalFilter[];
  refreshInterval?: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'table' | 'kpi' | 'text';
  size: 'small' | 'medium' | 'large' | 'xl';
  position: { x: number; y: number; w: number; h: number };
  dataSource: string;
  config: Record<string, any>;
  refreshInterval?: number;
}

export interface DashboardLayout {
  columns: number;
  gaps: number;
  responsive: boolean;
}

export interface GlobalFilter {
  id: string;
  name: string;
  type: 'date_range' | 'select' | 'multiselect';
  defaultValue: any;
  options?: Array<{ label: string; value: any }>;
}

export interface AnalyticsQuery {
  dataSource: string;
  fields: string[];
  filters: QueryFilter[];
  groupBy?: string[];
  orderBy?: Array<{ field: string; direction: 'asc' | 'desc' }>;
  limit?: number;
  aggregations?: Array<{ field: string; function: string; alias: string }>;
}

export interface QueryFilter {
  field: string;
  operator: string;
  value: any;
  logicalOperator?: 'AND' | 'OR';
}

export interface AnalyticsInsight {
  id: string;
  title: string;
  description: string;
  type: 'trend' | 'anomaly' | 'recommendation' | 'alert';
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  data: Record<string, any>;
  action?: string;
  dismissed: boolean;
  createdAt: Date;
}

export interface ExportJob {
  id: string;
  reportId: string;
  format: 'pdf' | 'excel' | 'csv' | 'json';
  parameters: Record<string, any>;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  downloadUrl?: string;
  error?: string;
  createdAt: Date;
  completedAt?: Date;
}
