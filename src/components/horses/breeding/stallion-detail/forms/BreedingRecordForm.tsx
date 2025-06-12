
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { BreedingRecord } from '@/types/breeding/stallion-detail';

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Breeding Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="veterinarian"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Veterinarian</FormLabel>
                <FormControl>
                  <Input placeholder="Dr. Wilson" {...field} />
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
            name="mareOwner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mare Owner</FormLabel>
                <FormControl>
                  <Input placeholder="Smith Ranch" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="method"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Breeding Method</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="AI Fresh">AI Fresh</SelectItem>
                    <SelectItem value="AI Frozen">AI Frozen</SelectItem>
                    <SelectItem value="Natural Cover">Natural Cover</SelectItem>
                    <SelectItem value="Embryo Transfer">Embryo Transfer</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="result"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Result</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select result" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Confirmed Pregnant">Confirmed Pregnant</SelectItem>
                    <SelectItem value="Not Pregnant">Not Pregnant</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Live Foal">Live Foal</SelectItem>
                    <SelectItem value="Lost Pregnancy">Lost Pregnancy</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Monitoring">Monitoring</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expectedFoaling"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expected Foaling (Optional)</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contractId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contract ID (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="C001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stud Fee (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="5000" 
                    {...field} 
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Additional notes about the breeding..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Record'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BreedingRecordForm;
