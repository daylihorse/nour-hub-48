
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FrozenSemenInventory } from '@/types/breeding/stallion-detail';
import { FormLayout } from '../shared/FormLayout';
import { DateField } from '../shared/form-fields/DateField';
import { TextField } from '../shared/form-fields/TextField';
import { SelectField } from '../shared/form-fields/SelectField';
import { frozenSemenQualityOptions } from '../config/formConfigs';

const frozenSemenSchema = z.object({
  stallionId: z.string().min(1, 'Stallion ID is required'),
  freezeDate: z.string().min(1, 'Freeze date is required'),
  straws: z.number().min(1, 'Number of straws must be at least 1'),
  tank: z.string().min(1, 'Tank is required'),
  quality: z.enum(['Grade A', 'Grade B', 'Grade C']),
  viability: z.string().min(1, 'Viability is required'),
  location: z.string().min(1, 'Location is required'),
  expiry: z.string().min(1, 'Expiry date is required'),
  batchNumber: z.string().optional(),
  freezingProtocol: z.string().optional(),
});

type FormData = z.infer<typeof frozenSemenSchema>;

interface FrozenSemenFormProps {
  stallionId: string;
  onSubmit: (data: Omit<FrozenSemenInventory, 'id' | 'createdAt'>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const FrozenSemenForm = ({ stallionId, onSubmit, onCancel, isLoading }: FrozenSemenFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(frozenSemenSchema),
    defaultValues: {
      stallionId,
      freezeDate: new Date().toISOString().split('T')[0],
      quality: 'Grade A',
      straws: 1,
      tank: '',
      viability: '',
      location: '',
      expiry: new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      batchNumber: '',
      freezingProtocol: '',
    },
  });

  const handleSubmit = async (data: FormData) => {
    const submissionData: Omit<FrozenSemenInventory, 'id' | 'createdAt'> = {
      stallionId: data.stallionId,
      freezeDate: data.freezeDate,
      straws: data.straws,
      tank: data.tank,
      quality: data.quality,
      viability: data.viability,
      location: data.location,
      expiry: data.expiry,
      batchNumber: data.batchNumber || undefined,
      freezingProtocol: data.freezingProtocol || undefined,
    };
    await onSubmit(submissionData);
  };

  return (
    <FormLayout
      form={form}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isLoading={isLoading}
      submitLabel="Save to Inventory"
    >
      <DateField
        control={form.control}
        name="freezeDate"
        label="Freeze Date"
        required
      />

      <TextField
        control={form.control}
        name="straws"
        label="Number of Straws"
        type="number"
        required
      />

      <TextField
        control={form.control}
        name="tank"
        label="Tank"
        placeholder="Tank A-3"
        required
      />

      <TextField
        control={form.control}
        name="location"
        label="Location"
        placeholder="Section 2B"
        required
      />

      <SelectField
        control={form.control}
        name="quality"
        label="Quality Grade"
        options={frozenSemenQualityOptions}
        required
      />

      <TextField
        control={form.control}
        name="viability"
        label="Viability"
        placeholder="92%"
        required
      />

      <DateField
        control={form.control}
        name="expiry"
        label="Expiry Date"
        required
      />

      <TextField
        control={form.control}
        name="batchNumber"
        label="Batch Number (Optional)"
        placeholder="B001"
      />

      <TextField
        control={form.control}
        name="freezingProtocol"
        label="Freezing Protocol (Optional)"
        placeholder="Standard Protocol A"
      />
    </FormLayout>
  );
};

export default FrozenSemenForm;
