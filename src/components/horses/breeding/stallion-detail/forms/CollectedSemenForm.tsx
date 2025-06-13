
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CollectedSemen } from '@/types/breeding/stallion-detail';
import { FormLayout } from '../shared/FormLayout';
import { DateField } from '../shared/form-fields/DateField';
import { TextField } from '../shared/form-fields/TextField';
import { SelectField } from '../shared/form-fields/SelectField';
import { TextareaField } from '../shared/form-fields/TextareaField';
import { qualityOptions, statusOptions } from '../config/formConfigs';

const collectedSemenSchema = z.object({
  stallionId: z.string().min(1, 'Stallion ID is required'),
  collectionDate: z.string().min(1, 'Collection date is required'),
  volume: z.string().min(1, 'Volume is required'),
  concentration: z.string().min(1, 'Concentration is required'),
  motility: z.string().min(1, 'Motility is required'),
  quality: z.enum(['Excellent', 'Good', 'Fair', 'Poor']),
  technician: z.string().min(1, 'Technician is required'),
  status: z.enum(['Fresh', 'Used', 'Frozen', 'Discarded']),
  temperature: z.string().optional(),
  ph: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof collectedSemenSchema>;

interface CollectedSemenFormProps {
  stallionId: string;
  onSubmit: (data: Omit<CollectedSemen, 'id' | 'createdAt'>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const CollectedSemenForm = ({ stallionId, onSubmit, onCancel, isLoading }: CollectedSemenFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(collectedSemenSchema),
    defaultValues: {
      stallionId,
      collectionDate: new Date().toISOString().split('T')[0],
      status: 'Fresh',
      quality: 'Good',
      volume: '',
      concentration: '',
      motility: '',
      technician: '',
      temperature: '',
      ph: '',
      notes: '',
    },
  });

  const handleSubmit = async (data: FormData) => {
    const submissionData: Omit<CollectedSemen, 'id' | 'createdAt'> = {
      stallionId: data.stallionId,
      collectionDate: data.collectionDate,
      volume: data.volume,
      concentration: data.concentration,
      motility: data.motility,
      quality: data.quality,
      technician: data.technician,
      status: data.status,
      temperature: data.temperature || undefined,
      ph: data.ph || undefined,
      notes: data.notes || undefined,
    };
    await onSubmit(submissionData);
  };

  return (
    <FormLayout
      form={form}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isLoading={isLoading}
      submitLabel="Save Collection"
    >
      <DateField
        control={form.control}
        name="collectionDate"
        label="Collection Date"
        required
      />

      <TextField
        control={form.control}
        name="technician"
        label="Technician"
        placeholder="Dr. Smith"
        required
      />

      <TextField
        control={form.control}
        name="volume"
        label="Volume"
        placeholder="50ml"
        required
      />

      <TextField
        control={form.control}
        name="concentration"
        label="Concentration"
        placeholder="150M/ml"
        required
      />

      <TextField
        control={form.control}
        name="motility"
        label="Motility"
        placeholder="85%"
        required
      />

      <SelectField
        control={form.control}
        name="quality"
        label="Quality"
        options={qualityOptions}
        required
      />

      <SelectField
        control={form.control}
        name="status"
        label="Status"
        options={statusOptions}
        required
      />

      <TextField
        control={form.control}
        name="temperature"
        label="Temperature (Optional)"
        placeholder="37°C"
      />

      <TextField
        control={form.control}
        name="ph"
        label="pH (Optional)"
        placeholder="7.2"
      />

      <div className="md:col-span-2">
        <TextareaField
          control={form.control}
          name="notes"
          label="Notes (Optional)"
          placeholder="Additional notes..."
        />
      </div>
    </FormLayout>
  );
};

export default CollectedSemenForm;
