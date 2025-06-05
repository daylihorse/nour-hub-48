
import { useState, useEffect } from 'react';
import { crossDepartmentalService } from '@/services/integration/crossDepartmentalService';
import { IntegrationEvent, BreedingClinicIntegration } from '@/types/integration';

export const useBreedingClinicIntegration = () => {
  const [integrations, setIntegrations] = useState<BreedingClinicIntegration[]>([]);
  const [events, setEvents] = useState<IntegrationEvent[]>([]);

  const triggerBreedingEvent = async (eventType: string, payload: any) => {
    await crossDepartmentalService.triggerBreedingEvent(eventType, payload);
    refreshData();
  };

  const refreshData = () => {
    setIntegrations(crossDepartmentalService.getBreedingClinicIntegrations());
    setEvents(crossDepartmentalService.getIntegrationEvents());
  };

  useEffect(() => {
    refreshData();
  }, []);

  return {
    integrations,
    events,
    triggerBreedingEvent,
    refreshData,
  };
};

export const useClinicHorsesIntegration = () => {
  const [integrations, setIntegrations] = useState([]);

  const updateHorseFromClinic = async (clinicRecordId: string, horseId: string, findings: any) => {
    await crossDepartmentalService.updateHorseFromClinicFindings(clinicRecordId, horseId, findings);
    setIntegrations(crossDepartmentalService.getClinicHorsesIntegrations());
  };

  useEffect(() => {
    setIntegrations(crossDepartmentalService.getClinicHorsesIntegrations());
  }, []);

  return {
    integrations,
    updateHorseFromClinic,
  };
};
