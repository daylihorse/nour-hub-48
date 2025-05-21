
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MessageCircle, MessageSquare, Plus, Trash2, WhatsappIcon } from "lucide-react";
import { Control, useFieldArray } from "react-hook-form";
import { Employee } from "@/types/employee";

interface PhoneSectionProps {
  control: Control<Omit<Employee, "id">>;
}

export const PhoneSection = ({ control }: PhoneSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "phones",
  });

  const addPhoneField = () => {
    if (fields.length < 3) {
      append({
        id: uuidv4(),
        countryCode: "",
        number: "",
        hasWhatsapp: false,
        hasTelegram: false,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel>Phone Numbers</FormLabel>
        {fields.length < 3 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addPhoneField}
            className="h-8 px-2"
          >
            <Plus className="mr-1 h-4 w-4" /> Add Phone
          </Button>
        )}
      </div>

      {fields.length === 0 && (
        <div className="text-center p-4 border border-dashed rounded-md">
          <Button
            type="button"
            variant="outline"
            onClick={addPhoneField}
            className="mx-auto"
          >
            <Plus className="mr-2 h-4 w-4" /> Add First Phone Number
          </Button>
        </div>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border rounded-md relative">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Phone #{index + 1}</h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
              className="h-8 w-8 p-0 text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex space-x-2">
            <div className="w-1/3">
              <FormField
                control={control}
                name={`phones.${index}.countryCode`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Country Code</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. +1, +44"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex-1">
              <FormField
                control={control}
                name={`phones.${index}.number`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Phone Number</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <MessageCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="(123) 456-7890" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name={`phones.${index}.hasWhatsapp`}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5 leading-none">
                    <FormLabel>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-green-500"
                        >
                          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                          <path d="M13 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                          <path d="M9 14a5 5 0 0 0 6 0" />
                        </svg>
                        WhatsApp
                      </div>
                    </FormLabel>
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
              control={control}
              name={`phones.${index}.hasTelegram`}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5 leading-none">
                    <FormLabel>
                      <div className="flex items-center">
                        <MessageSquare className="mr-2 h-4 w-4 text-blue-500" />
                        Telegram
                      </div>
                    </FormLabel>
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
        </div>
      ))}
    </div>
  );
};
