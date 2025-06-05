
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contractSchema = z.object({
  contractNumber: z.string().min(1, "Contract number is required"),
  stallionId: z.string().min(1, "Stallion selection is required"),
  mareId: z.string().min(1, "Mare selection is required"),
  mareOwner: z.string().min(1, "Mare owner is required"),
  contractDate: z.date(),
  studFee: z.number().min(0, "Stud fee must be positive"),
  livefoalGuarantee: z.boolean(),
  returnPrivilege: z.boolean(),
  paymentTerms: z.string().min(1, "Payment terms are required"),
  specialConditions: z.string().optional(),
  veterinarian: z.string().optional(),
  insuranceRequired: z.boolean(),
  contractExpiry: z.date(),
});

type ContractFormData = z.infer<typeof contractSchema>;

interface ContractFormProps {
  onClose: () => void;
  onSave: (contract: ContractFormData) => void;
}

const ContractForm = ({ onClose, onSave }: ContractFormProps) => {
  const form = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      contractDate: new Date(),
      studFee: 0,
      livefoalGuarantee: false,
      returnPrivilege: false,
      insuranceRequired: false,
      contractExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    },
  });

  const onSubmit = (data: ContractFormData) => {
    onSave(data);
  };

  const stallions = [
    { id: "S001", name: "Thunder" },
    { id: "S002", name: "Lightning" },
    { id: "S003", name: "Storm" },
  ];

  const mares = [
    { id: "M001", name: "Whisper" },
    { id: "M002", name: "Grace" },
    { id: "M003", name: "Bella" },
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Breeding Contract</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contractNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contract Number</FormLabel>
                    <FormControl>
                      <Input placeholder="SVC-2024-XXX" {...field} />
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
                      <Input placeholder="Owner name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stallionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stallion</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stallion" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {stallions.map((stallion) => (
                          <SelectItem key={stallion.id} value={stallion.id}>
                            {stallion.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mareId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mare</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select mare" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mares.map((mare) => (
                          <SelectItem key={mare.id} value={mare.id}>
                            {mare.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contractDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Contract Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contractExpiry"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Contract Expiry</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="studFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stud Fee ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="5000" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
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
                    <FormLabel>Veterinarian (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr. Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="paymentTerms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Terms</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="50% on signing, 50% on confirmation of pregnancy"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Conditions (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Mare must be vaccinated 30 days prior to breeding"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="livefoalGuarantee"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Live Foal Guarantee</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="returnPrivilege"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Return Privilege</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="insuranceRequired"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Insurance Required</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Create Contract</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ContractForm;
