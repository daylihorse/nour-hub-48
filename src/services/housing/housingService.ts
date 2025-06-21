
import { PaddockAssignment } from '@/types/paddocks';
import { v4 as uuidv4 } from 'uuid';

class HousingService {
  assignHorseToPaddock(assignmentData: Omit<PaddockAssignment, 'id' | 'createdAt' | 'updatedAt'>): PaddockAssignment {
    // This method is used by the existing PaddockHorseAssignment component
    // It creates a local assignment object that will be handled by the database service
    const assignment: PaddockAssignment = {
      ...assignmentData,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return assignment;
  }
}

export const housingService = new HousingService();
