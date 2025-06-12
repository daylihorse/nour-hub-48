
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
import { FrozenSemenInventory } from '@/types/breeding/stallion-detail';

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
    // Transform the form data to match the expected type
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="freezeDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Freeze Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="straws"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Straws</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
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
                  <Input placeholder="Tank A-3" {...field} />
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
                  <Input placeholder="Section 2B" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quality Grade</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality grade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Grade A">Grade A</SelectItem>
                    <SelectItem value="Grade B">Grade B</SelectItem>
                    <SelectItem value="Grade C">Grade C</SelectItem>
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
                  <Input placeholder="92%" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expiry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="batchNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Batch Number (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="B001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="freezingProtocol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Freezing Protocol (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Standard Protocol A" {...field} />
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
            {isLoading ? 'Saving...' : 'Save to Inventory'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FrozenSemenForm;
