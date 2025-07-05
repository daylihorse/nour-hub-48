
export type HorseGender = 'stallion' | 'mare' | 'gelding';
export type HorseStatus = 'active' | 'inactive' | 'transferred' | 'deceased';

export interface Horse {
  id: string;
  name: string;
  arabicName?: string;
  breed: string;
  gender: HorseGender;
  birthDate: string;
  color: string;
  status: HorseStatus;
  ownerName: string;
  registrationNumber: string;
  microchipId?: string;
  height?: number;
  weight?: number;
}
