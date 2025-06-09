
import { IntegrationEvent, EventHandler, IntegrationError } from '@/types/integration/interfaces';

class EventBus {
  private handlers: Map<string, EventHandler[]> = new Map();
  private events: IntegrationEvent[] = [];
  private errors: IntegrationError[] = [];
  private config = {
    retryAttempts: 3,
    timeoutMs: 30000,
    enableLogging: true,
    errorThreshold: 0.1
  };

  // Register event handler
  subscribe(eventType: string, handler: EventHandler): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    
    const handlers = this.handlers.get(eventType)!;
    handlers.push(handler);
    
    // Sort by priority
    handlers.sort((a, b) => b.priority - a.priority);
    
    if (this.config.enableLogging) {
      console.log(`Registered handler for event type: ${eventType}`);
    }
  }

  // Unregister event handler
  unsubscribe(eventType: string, handler: EventHandler): void {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  // Emit event
  async emit(event: IntegrationEvent): Promise<void> {
    this.events.push(event);
    
    if (this.config.enableLogging) {
      console.log(`Emitting event: ${event.eventType}`, event);
    }

    const handlers = this.handlers.get(event.eventType) || [];
    
    if (handlers.length === 0) {
      console.warn(`No handlers registered for event type: ${event.eventType}`);
      return;
    }

    // Process handlers in parallel
    const promises = handlers.map(handler => this.processHandler(event, handler));
    
    try {
      await Promise.allSettled(promises);
      event.status = 'completed';
      event.processedAt = new Date();
    } catch (error) {
      event.status = 'failed';
      event.error = error instanceof Error ? error.message : 'Unknown error';
      this.recordError(event, error);
    }
  }

  private async processHandler(event: IntegrationEvent, handler: EventHandler): Promise<void> {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Handler timeout')), this.config.timeoutMs)
    );

    try {
      event.status = 'processing';
      await Promise.race([handler.handler(event), timeout]);
    } catch (error) {
      event.retryCount = (event.retryCount || 0) + 1;
      
      if (event.retryCount < this.config.retryAttempts) {
        console.log(`Retrying event ${event.id}, attempt ${event.retryCount}`);
        await new Promise(resolve => setTimeout(resolve, 1000 * event.retryCount));
        return this.processHandler(event, handler);
      }
      
      throw error;
    }
  }

  private recordError(event: IntegrationEvent, error: any): void {
    const integrationError: IntegrationError = {
      id: `error_${Date.now()}`,
      eventId: event.id,
      moduleId: event.sourceModule,
      errorType: 'processing',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date(),
      resolved: false
    };

    this.errors.push(integrationError);
    
    if (this.config.enableLogging) {
      console.error('Integration error recorded:', integrationError);
    }
  }

  // Get event history
  getEvents(filter?: { moduleId?: string; status?: string; limit?: number }): IntegrationEvent[] {
    let filtered = this.events;

    if (filter?.moduleId) {
      filtered = filtered.filter(e => 
        e.sourceModule === filter.moduleId || e.targetModule === filter.moduleId
      );
    }

    if (filter?.status) {
      filtered = filtered.filter(e => e.status === filter.status);
    }

    if (filter?.limit) {
      filtered = filtered.slice(-filter.limit);
    }

    return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Get errors
  getErrors(resolved?: boolean): IntegrationError[] {
    return this.errors
      .filter(error => resolved === undefined || error.resolved === resolved)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  // Get metrics
  getMetrics(): any {
    const total = this.events.length;
    const successful = this.events.filter(e => e.status === 'completed').length;
    const failed = this.events.filter(e => e.status === 'failed').length;
    
    const processingTimes = this.events
      .filter(e => e.processedAt)
      .map(e => e.processedAt!.getTime() - e.createdAt.getTime());
    
    const avgProcessingTime = processingTimes.length > 0 
      ? processingTimes.reduce((sum, time) => sum + time, 0) / processingTimes.length 
      : 0;

    return {
      totalEvents: total,
      successfulEvents: successful,
      failedEvents: failed,
      averageProcessingTime: avgProcessingTime,
      errorRate: total > 0 ? failed / total : 0,
      moduleStatus: this.getModuleStatus()
    };
  }

  private getModuleStatus(): Record<string, 'healthy' | 'warning' | 'error'> {
    const modules = new Set([
      ...this.events.map(e => e.sourceModule),
      ...this.events.map(e => e.targetModule)
    ]);

    const status: Record<string, 'healthy' | 'warning' | 'error'> = {};

    modules.forEach(module => {
      const moduleEvents = this.events.filter(e => 
        e.sourceModule === module || e.targetModule === module
      );
      
      const recentEvents = moduleEvents.slice(-10);
      const failureRate = recentEvents.length > 0 
        ? recentEvents.filter(e => e.status === 'failed').length / recentEvents.length 
        : 0;

      if (failureRate > this.config.errorThreshold) {
        status[module] = 'error';
      } else if (failureRate > this.config.errorThreshold / 2) {
        status[module] = 'warning';
      } else {
        status[module] = 'healthy';
      }
    });

    return status;
  }

  // Clear old events and errors
  cleanup(olderThanDays: number = 30): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

    this.events = this.events.filter(e => e.createdAt > cutoffDate);
    this.errors = this.errors.filter(e => e.timestamp > cutoffDate);
  }
}

export const eventBus = new EventBus();
