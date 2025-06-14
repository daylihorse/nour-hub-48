
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FrozenEmbryoInventory } from '@/types/breeding/stallion-detail';
import { FormLayout } from '../shared/FormLayout';
import { DateField } from '../shared/form-fields/DateField';
import { TextField } from '../shared/form-fields/TextField';
import { SelectField } from '../shared/form-fields/SelectField';
import { embryoGradeOptions, embryoStageOptions } from '../config/formConfigs';

const frozenEmbryoSchema = z.object({
  stallionId: z.string().min(1, 'Stallion ID is required'),
  creationDate: z.string().min(1, 'Creation date is required'),
  mareName: z.string().min(1, 'Mare name is required'),
  mareId: z.string().optional(),
  grade: z.enum(['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4']),
  stage: z.enum(['Morula', 'Early Blastocyst', 'Blastocyst', 'Expanded Blastocyst', 'Hatched Blastocyst']),
  viability: z.string().min(1, 'Viability is required'),
  tank: z.string().min(1, 'Tank is required'),
  location: z.string().min(1, 'Location is required'),
  diameter: z.string().optional(),
  freezingMethod: z.string().optional(),
});

type FormData = z.infer<typeof frozenEmbryoSchema>;

interface FrozenEmbryoFormProps {
  stallionId: string;
  onSubmit: (data: Omit<FrozenEmbryoInventory, 'id' | 'createdAt'>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: FrozenEmbryoInventory;
}

const FrozenEmbryoForm = ({ stallionId, onSubmit, onCancel, isLoading, initialData }: FrozenEmbryoFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(frozenEmbryoSchema),
    defaultValues: {
      stallionId,
      creationDate: initialData?.creationDate || new Date().toISOString().split('T')[0],
      grade: initialData?.grade || 'Grade 1',
      stage: initialData?.stage || 'Blastocyst',
      mareName: initialData?.mareName || '',
      mareId: initialData?.mareId || '',
      viability: initialData?.viability || '',
      tank: initialData?.tank || '',
      location: initialData?.location || '',
      diameter: initialData?.diameter || '',
      freezingMethod: initialData?.freezingMethod || 'Vitrification',
    },
  });

  const handleSubmit = async (data: FormData) => {
    const submissionData: Omit<FrozenEmbryoInventory, 'id' | 'createdAt'> = {
      stallionId: data.stallionId,
      creationDate: data.creationDate,
      mareName: data.mareName,
      mareId: data.mareId || undefined,
      grade: data.grade,
      stage: data.stage,
      viability: data.viability,
      tank: data.tank,
      location: data.location,
      diameter: data.diameter || undefined,
      freezingMethod: data.freezingMethod || undefined,
    };
    await onSubmit(submissionData);
  };

  return (
    <FormLayout
      form={form}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isLoading={isLoading}
      submitLabel="Save Embryo"
    >
      <DateField
        control={form.control}
        name="creationDate"
        label="Creation Date"
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

      <SelectField
        control={form.control}
        name="grade"
        label="Grade"
        options={embryoGradeOptions}
        required
      />

      <SelectField
        control={form.control}
        name="stage"
        label="Embryonic Stage"
        options={embryoStageOptions}
        required
      />

      <TextField
        control={form.control}
        name="viability"
        label="Viability"
        placeholder="95%"
        required
      />

      <TextField
        control={form.control}
        name="tank"
        label="Tank"
        placeholder="Tank C-2"
        required
      />

      <TextField
        control={form.control}
        name="location"
        label="Location"
        placeholder="Section 3A"
        required
      />

      <TextField
        control={form.control}
        name="diameter"
        label="Diameter (Optional)"
        placeholder="180μm"
      />

      <TextField
        control={form.control}
        name="freezingMethod"
        label="Freezing Method (Optional)"
        placeholder="Vitrification"
      />
    </FormLayout>
  );
};

export default FrozenEmbryoForm;
