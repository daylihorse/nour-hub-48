
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BreedingRecord } from '@/types/breeding/stallion-detail';
import { FormLayout } from '../shared/FormLayout';
import { DateField } from '../shared/form-fields/DateField';
import { TextField } from '../shared/form-fields/TextField';
import { SelectField } from '../shared/form-fields/SelectField';
import { TextareaField } from '../shared/form-fields/TextareaField';
import { breedingMethodOptions, breedingResultOptions, breedingStatusOptions } from '../config/formConfigs';

const breedingRecordSchema = z.object({
  stallionId: z.string().min(1, 'Stallion ID is required'),
  date: z.string().min(1, 'Breeding date is required'),
  mareName: z.string().min(1, 'Mare name is required'),
  mareId: z.string().optional(),
  mareOwner: z.string().min(1, 'Mare owner is required'),
  method: z.enum(['AI Fresh', 'AI Frozen', 'Natural Cover', 'Embryo Transfer']),
  result: z.enum(['Confirmed Pregnant', 'Not Pregnant', 'Pending', 'Live Foal', 'Lost Pregnancy']),
  status: z.enum(['Active', 'Completed', 'Monitoring', 'Cancelled']),
  expectedFoaling: z.string().optional(),
  veterinarian: z.string().min(1, 'Veterinarian is required'),
  contractId: z.string().optional(),
  studFee: z.number().min(0, 'Stud fee must be positive').optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof breedingRecordSchema>;

interface BreedingRecordFormProps {
  stallionId: string;
  onSubmit: (data: Omit<BreedingRecord, 'id' | 'createdAt'>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const BreedingRecordForm = ({ stallionId, onSubmit, onCancel, isLoading }: BreedingRecordFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(breedingRecordSchema),
    defaultValues: {
      stallionId,
      date: new Date().toISOString().split('T')[0],
      method: 'AI Fresh',
      result: 'Pending',
      status: 'Active',
      mareName: '',
      mareId: '',
      mareOwner: '',
      expectedFoaling: '',
      veterinarian: '',
      contractId: '',
      studFee: 0,
      notes: '',
    },
  });

  const handleSubmit = async (data: FormData) => {
    const submissionData: Omit<BreedingRecord, 'id' | 'createdAt'> = {
      stallionId: data.stallionId,
      date: data.date,
      mareName: data.mareName,
      mareId: data.mareId || undefined,
      mareOwner: data.mareOwner,
      method: data.method,
      result: data.result,
      status: data.status,
      expectedFoaling: data.expectedFoaling || undefined,
      veterinarian: data.veterinarian,
      contractId: data.contractId || undefined,
      studFee: data.studFee || undefined,
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
      submitLabel="Save Record"
    >
      <DateField
        control={form.control}
        name="date"
        label="Breeding Date"
        required
      />

      <TextField
        control={form.control}
        name="veterinarian"
        label="Veterinarian"
        placeholder="Dr. Wilson"
        required
      />

      <TextField
        control={form.control}
        name="mareName"
        label="Mare Name"
        placeholder="Golden Mare"
        required
      />

      <TextField
        control={form.control}
        name="mareId"
        label="Mare ID (Optional)"
        placeholder="M001"
      />

      <TextField
        control={form.control}
        name="mareOwner"
        label="Mare Owner"
        placeholder="Smith Ranch"
        required
      />

      <SelectField
        control={form.control}
        name="method"
        label="Breeding Method"
        options={breedingMethodOptions}
        required
      />

      <SelectField
        control={form.control}
        name="result"
        label="Result"
        options={breedingResultOptions}
        required
      />

      <SelectField
        control={form.control}
        name="status"
        label="Status"
        options={breedingStatusOptions}
        required
      />

      <DateField
        control={form.control}
        name="expectedFoaling"
        label="Expected Foaling (Optional)"
      />

      <TextField
        control={form.control}
        name="contractId"
        label="Contract ID (Optional)"
        placeholder="C001"
      />

      <TextField
        control={form.control}
        name="studFee"
        label="Stud Fee (Optional)"
        type="number"
        placeholder="5000"
      />

      <div className="md:col-span-2">
        <TextareaField
          control={form.control}
          name="notes"
          label="Notes (Optional)"
          placeholder="Additional notes about the breeding..."
        />
      </div>
    </FormLayout>
  );
};

export default BreedingRecordForm;
