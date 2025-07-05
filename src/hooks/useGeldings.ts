
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Horse } from "@/types/horse-unified";

export const useGeldings = () => {
  return useQuery({
    queryKey: ['geldings'],
    queryFn: async (): Promise<Horse[]> => {
      const { data, error } = await supabase
        .from('horses')
        .select('*')
        .eq('gender', 'gelding')
        .eq('status', 'active');

      if (error) {
        console.error('Error fetching geldings:', error);
        throw error;
      }

      // Map database fields to Horse interface with all required properties
      return (data || []).map(horse => ({
        id: horse.id,
        name: horse.name,
        arabicName: horse.arabic_name,
        breed: horse.breed,
        gender: horse.gender as 'stallion' | 'mare' | 'gelding',
        birthDate: horse.birth_date,
        color: horse.color,
        ownerType: horse.owner_type as 'individual' | 'company' | 'partnership',
        ownerName: horse.owner_name,
        ownerContact: horse.owner_contact,
        registrationNumber: horse.registration_number,
        passportNumber: horse.passport_number,
        microchipId: horse.microchip_id,
        height: horse.height,
        weight: horse.weight,
        bloodlineOrigin: horse.bloodline_origin,
        currentLocation: horse.current_location,
        stallNumber: horse.stall_number,
        purchasePrice: horse.purchase_price,
        marketValue: horse.market_value,
        insuranceValue: horse.insurance_value,
        insured: horse.insured,
        status: horse.status as 'active' | 'inactive' | 'transferred' | 'deceased',
        healthStatus: horse.health_status as 'healthy' | 'under_treatment' | 'quarantine',
        insuranceProvider: horse.insurance_provider,
        vaccinationStatus: 'up_to_date' as 'up_to_date' | 'partial' | 'none', // Default value since not in DB
        images: [],
        documents: []
      }));
    },
  });
};
