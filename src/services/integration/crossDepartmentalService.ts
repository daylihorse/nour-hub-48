import { IntegrationEvent, BreedingClinicIntegration, ClinicHorsesIntegration, AutomationRule } from '@/types/integration';

class CrossDepartmentalService {
  private events: IntegrationEvent[] = [];
  private breedingClinicIntegrations: BreedingClinicIntegration[] = [];
  private clinicHorsesIntegrations: ClinicHorsesIntegration[] = [];
  private automationRules: AutomationRule[] = [
    {
      id: "rule_1",
      name: "Auto-schedule Pre-breeding Checkup",
      sourceEvent: "breeding_scheduled",
      targetAction: "create_clinic_appointment",
      conditions: [
        { field: "mare_health_status", operator: "equals", value: "healthy" },
        { field: "stallion_health_status", operator: "equals", value: "healthy" }
      ],
      enabled: true,
      createdAt: new Date(),
    },
  ];

  // Breeding to Clinic Integration
  async triggerBreedingEvent(eventType: string, payload: any): Promise<void> {
    const event: IntegrationEvent = {
      id: `evt_${Date.now()}`,
      sourceModule: 'breeding',
      targetModule: 'clinic',
      eventType,
      payload,
      status: 'pending',
      createdAt: new Date(),
    };

    this.events.push(event);
    await this.processBreedingEvent(event);
  }

  private async processBreedingEvent(event: IntegrationEvent): Promise<void> {
    console.log('Processing breeding event:', event);

    try {
      event.status = 'processing';

      // Check automation rules
      const applicableRules = this.automationRules.filter(rule => 
        rule.enabled && rule.sourceEvent === event.eventType
      );

      for (const rule of applicableRules) {
        if (this.evaluateConditions(rule.conditions, event.payload)) {
          await this.executeAutomatedAction(rule.targetAction, event.payload);
        }
      }

      switch (event.eventType) {
        case 'breeding_scheduled':
          await this.schedulePreBreedingCheckup(event.payload);
          break;
        case 'pregnancy_confirmed':
          await this.schedulePregnancyMonitoring(event.payload);
          break;
        case 'foaling_due':
          await this.scheduleFoalingSupport(event.payload);
          break;
        case 'health_check_needed':
          await this.scheduleHealthCheckup(event.payload);
          break;
      }

      event.status = 'completed';
      event.processedAt = new Date();
    } catch (error) {
      event.status = 'failed';
      event.error = error instanceof Error ? error.message : 'Unknown error';
      console.error('Failed to process breeding event:', error);
    }
  }

  private evaluateConditions(conditions: any[], payload: any): boolean {
    return conditions.every(condition => {
      const fieldValue = payload[condition.field];
      switch (condition.operator) {
        case 'equals':
          return fieldValue === condition.value;
        case 'not_equals':
          return fieldValue !== condition.value;
        case 'greater_than':
          return Number(fieldValue) > Number(condition.value);
        case 'less_than':
          return Number(fieldValue) < Number(condition.value);
        case 'contains':
          return String(fieldValue).includes(condition.value);
        default:
          return false;
      }
    });
  }

  private async executeAutomatedAction(action: string, payload: any): Promise<void> {
    console.log(`Executing automated action: ${action}`, payload);
    
    switch (action) {
      case 'create_clinic_appointment':
        console.log('Auto-creating clinic appointment');
        break;
      case 'schedule_ultrasound_series':
        console.log('Auto-scheduling ultrasound series');
        break;
      case 'update_breeding_eligibility':
        console.log('Auto-updating breeding eligibility');
        break;
      case 'send_notification':
        console.log('Auto-sending notification');
        break;
      case 'update_horse_status':
        console.log('Auto-updating horse status');
        break;
    }
  }

  private async schedulePreBreedingCheckup(payload: any): Promise<void> {
    const integration: BreedingClinicIntegration = {
      breedingEventId: payload.breedingId,
      triggerType: 'breeding_scheduled',
      status: 'pending',
      scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      notes: `Pre-breeding health check for ${payload.mareName} and ${payload.stallionName}`,
    };

    this.breedingClinicIntegrations.push(integration);
    console.log('Scheduled pre-breeding checkup:', integration);
  }

  private async schedulePregnancyMonitoring(payload: any): Promise<void> {
    const integration: BreedingClinicIntegration = {
      breedingEventId: payload.pregnancyId,
      triggerType: 'pregnancy_confirmed',
      status: 'pending',
      scheduledDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      notes: `First pregnancy ultrasound for ${payload.mareName}`,
    };

    this.breedingClinicIntegrations.push(integration);
    console.log('Scheduled pregnancy monitoring:', integration);
  }

  private async scheduleFoalingSupport(payload: any): Promise<void> {
    const integration: BreedingClinicIntegration = {
      breedingEventId: payload.pregnancyId,
      triggerType: 'foaling_due',
      status: 'pending',
      scheduledDate: payload.expectedDate,
      notes: `Foaling support for ${payload.mareName}`,
    };

    this.breedingClinicIntegrations.push(integration);
    console.log('Scheduled foaling support:', integration);
  }

  private async scheduleHealthCheckup(payload: any): Promise<void> {
    const integration: BreedingClinicIntegration = {
      breedingEventId: payload.horseId,
      triggerType: 'health_check_needed',
      status: 'pending',
      scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      notes: `Health check needed for ${payload.horseName}`,
    };

    this.breedingClinicIntegrations.push(integration);
    console.log('Scheduled health checkup:', integration);
  }

  // Clinic to Horses Integration
  async updateHorseFromClinicFindings(clinicRecordId: string, horseId: string, findings: any): Promise<void> {
    const integration: ClinicHorsesIntegration = {
      clinicRecordId,
      horseId,
      updateType: 'health_status',
      findings,
      recommendations: findings.recommendations || [],
      followUpRequired: findings.requiresFollowUp || false,
    };

    this.clinicHorsesIntegrations.push(integration);
    await this.processClinicUpdate(integration);

    // Trigger event for potential automation
    const event: IntegrationEvent = {
      id: `evt_${Date.now()}`,
      sourceModule: 'clinic',
      targetModule: 'horses',
      eventType: 'health_check_completed',
      payload: { horseId, findings },
      status: 'completed',
      createdAt: new Date(),
      processedAt: new Date(),
    };
    this.events.push(event);
  }

  private async processClinicUpdate(integration: ClinicHorsesIntegration): Promise<void> {
    console.log('Processing clinic update:', integration);
    
    // Update horse health status based on clinic findings
    if (integration.findings.healthStatus) {
      console.log(`Updating horse ${integration.horseId} health status to: ${integration.findings.healthStatus}`);
    }

    // Update breeding eligibility
    if (integration.findings.breedingEligible !== undefined) {
      console.log(`Updating horse ${integration.horseId} breeding eligibility to: ${integration.findings.breedingEligible}`);
    }
  }

  // Automation Rules Management
  addAutomationRule(rule: AutomationRule): void {
    this.automationRules.push(rule);
  }

  updateAutomationRule(ruleId: string, updates: Partial<AutomationRule>): void {
    const index = this.automationRules.findIndex(rule => rule.id === ruleId);
    if (index !== -1) {
      this.automationRules[index] = { ...this.automationRules[index], ...updates };
    }
  }

  deleteAutomationRule(ruleId: string): void {
    this.automationRules = this.automationRules.filter(rule => rule.id !== ruleId);
  }

  // Getters for UI components
  getBreedingClinicIntegrations(): BreedingClinicIntegration[] {
    return this.breedingClinicIntegrations;
  }

  getClinicHorsesIntegrations(): ClinicHorsesIntegration[] {
    return this.clinicHorsesIntegrations;
  }

  getIntegrationEvents(): IntegrationEvent[] {
    return this.events;
  }

  getAutomationRules(): AutomationRule[] {
    return this.automationRules;
  }
}

export const crossDepartmentalService = new CrossDepartmentalService();
