
// Core integration interfaces for cross-departmental operations
export interface IntegrationModule {
  id: string;
  name: string;
  department: 'horses' | 'clinic' | 'inventory' | 'finance' | 'breeding' | 'laboratory';
  status: 'active' | 'inactive' | 'error';
  lastSync?: Date;
}

export interface IntegrationEvent {
  id: string;
  sourceModule: string;
  targetModule: string;
  eventType: string;
  payload: any;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  processedAt?: Date;
  error?: string;
  retryCount?: number;
}

export interface EventHandler {
  eventType: string;
  handler: (event: IntegrationEvent) => Promise<void>;
  priority: number;
}

export interface IntegrationError {
  id: string;
  eventId?: string;
  moduleId: string;
  errorType: 'connection' | 'validation' | 'processing' | 'timeout';
  message: string;
  stack?: string;
  timestamp: Date;
  resolved: boolean;
}

export interface IntegrationMetrics {
  totalEvents: number;
  successfulEvents: number;
  failedEvents: number;
  averageProcessingTime: number;
  errorRate: number;
  moduleStatus: Record<string, 'healthy' | 'warning' | 'error'>;
}

export interface IntegrationConfig {
  retryAttempts: number;
  timeoutMs: number;
  batchSize: number;
  enableLogging: boolean;
  errorThreshold: number;
}
