
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { CollectedSemen } from '@/types/breeding/stallion-detail';

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
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="collectionDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collection Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="technician"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technician</FormLabel>
                <FormControl>
                  <Input placeholder="Dr. Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="volume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Volume</FormLabel>
                <FormControl>
                  <Input placeholder="50ml" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="concentration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Concentration</FormLabel>
                <FormControl>
                  <Input placeholder="150M/ml" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="motility"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motility</FormLabel>
                <FormControl>
                  <Input placeholder="85%" {...field} />
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
                <FormLabel>Quality</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
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
                    <SelectItem value="Fresh">Fresh</SelectItem>
                    <SelectItem value="Used">Used</SelectItem>
                    <SelectItem value="Frozen">Frozen</SelectItem>
                    <SelectItem value="Discarded">Discarded</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="temperature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperature (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="37°C" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ph"
            render={({ field }) => (
              <FormItem>
                <FormLabel>pH (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="7.2" {...field} />
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
                <Textarea placeholder="Additional notes..." {...field} />
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
            {isLoading ? 'Saving...' : 'Save Collection'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CollectedSemenForm;
