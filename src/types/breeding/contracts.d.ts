
export interface BreedingBooking {
  id: string;
  stallionId: string;
  mareId: string;
  requestedDate: Date;
  confirmedDate?: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  method: 'natural' | 'artificial_insemination';
  cost: number;
  notes?: string;
  createdAt: Date;
}

export interface AvailabilitySlot {
  id: string;
  date: Date;
  timeSlot: string;
  isAvailable: boolean;
  isBooked: boolean;
  bookingId?: string;
}
