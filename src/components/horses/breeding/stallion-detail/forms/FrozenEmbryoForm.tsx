
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FrozenEmbryoInventory } from '@/types/breeding/stallion-detail';

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
}

const FrozenEmbryoForm = ({ stallionId, onSubmit, onCancel, isLoading }: FrozenEmbryoFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(frozenEmbryoSchema),
    defaultValues: {
      stallionId,
      creationDate: new Date().toISOString().split('T')[0],
      grade: 'Grade 1',
      stage: 'Blastocyst',
      mareName: '',
      mareId: '',
      viability: '',
      tank: '',
      location: '',
      diameter: '',
      freezingMethod: 'Vitrification',
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="creationDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Creation Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mareName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mare Name</FormLabel>
                <FormControl>
                  <Input placeholder="Golden Mare" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mareId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mare ID (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="M001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Grade 1">Grade 1</SelectItem>
                    <SelectItem value="Grade 2">Grade 2</SelectItem>
                    <SelectItem value="Grade 3">Grade 3</SelectItem>
                    <SelectItem value="Grade 4">Grade 4</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Embryonic Stage</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Morula">Morula</SelectItem>
                    <SelectItem value="Early Blastocyst">Early Blastocyst</SelectItem>
                    <SelectItem value="Blastocyst">Blastocyst</SelectItem>
                    <SelectItem value="Expanded Blastocyst">Expanded Blastocyst</SelectItem>
                    <SelectItem value="Hatched Blastocyst">Hatched Blastocyst</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="viability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Viability</FormLabel>
                <FormControl>
                  <Input placeholder="95%" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tank"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tank</FormLabel>
                <FormControl>
                  <Input placeholder="Tank C-2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Section 3A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="diameter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diameter (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="180μm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="freezingMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Freezing Method (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Vitrification" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Embryo'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FrozenEmbryoForm;
