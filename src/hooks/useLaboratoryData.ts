
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { laboratoryService, LaboratorySample, LaboratoryTestResult, LaboratoryTemplate, LaboratoryEquipment } from '@/services/laboratory/laboratoryService';
import { useToast } from '@/hooks/use-toast';

export const useLaboratoryData = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Samples
  const { data: samples = [], isLoading: samplesLoading } = useQuery({
    queryKey: ['laboratory-samples'],
    queryFn: () => laboratoryService.getSamples(),
  });

  // Test Results
  const { data: testResults = [], isLoading: resultsLoading } = useQuery({
    queryKey: ['laboratory-test-results'],
    queryFn: () => laboratoryService.getTestResults(),
  });

  // Templates
  const { data: templates = [], isLoading: templatesLoading } = useQuery({
    queryKey: ['laboratory-templates'],
    queryFn: () => laboratoryService.getTemplates(),
  });

  // Equipment
  const { data: equipment = [], isLoading: equipmentLoading } = useQuery({
    queryKey: ['laboratory-equipment'],
    queryFn: () => laboratoryService.getEquipment(),
  });

  // Dashboard metrics
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['laboratory-metrics'],
    queryFn: () => laboratoryService.getDashboardMetrics(),
  });

  // Mutations
  const createSampleMutation = useMutation({
    mutationFn: (sample: Omit<LaboratorySample, 'id' | 'created_at' | 'updated_at'>) =>
      laboratoryService.createSample(sample),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laboratory-samples'] });
      queryClient.invalidateQueries({ queryKey: ['laboratory-metrics'] });
      toast({
        title: "Success",
        description: "Sample created successfully",
      });
    },
    onError: (error) => {
      console.error('Error creating sample:', error);
      toast({
        title: "Error",
        description: "Failed to create sample",
        variant: "destructive",
      });
    },
  });

  const updateSampleMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<LaboratorySample> }) =>
      laboratoryService.updateSample(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laboratory-samples'] });
      toast({
        title: "Success",
        description: "Sample updated successfully",
      });
    },
    onError: (error) => {
      console.error('Error updating sample:', error);
      toast({
        title: "Error",
        description: "Failed to update sample",
        variant: "destructive",
      });
    },
  });

  const createTestResultMutation = useMutation({
    mutationFn: (result: Omit<LaboratoryTestResult, 'id' | 'created_at' | 'updated_at'>) =>
      laboratoryService.createTestResult(result),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laboratory-test-results'] });
      queryClient.invalidateQueries({ queryKey: ['laboratory-metrics'] });
      toast({
        title: "Success",
        description: "Test result created successfully",
      });
    },
    onError: (error) => {
      console.error('Error creating test result:', error);
      toast({
        title: "Error",
        description: "Failed to create test result",
        variant: "destructive",
      });
    },
  });

  const updateTestResultMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<LaboratoryTestResult> }) =>
      laboratoryService.updateTestResult(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laboratory-test-results'] });
      toast({
        title: "Success",
        description: "Test result updated successfully",
      });
    },
    onError: (error) => {
      console.error('Error updating test result:', error);
      toast({
        title: "Error",
        description: "Failed to update test result",
        variant: "destructive",
      });
    },
  });

  const createTemplateMutation = useMutation({
    mutationFn: (template: Omit<LaboratoryTemplate, 'id' | 'created_at' | 'updated_at'>) =>
      laboratoryService.createTemplate(template),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laboratory-templates'] });
      toast({
        title: "Success",
        description: "Template created successfully",
      });
    },
    onError: (error) => {
      console.error('Error creating template:', error);
      toast({
        title: "Error",
        description: "Failed to create template",
        variant: "destructive",
      });
    },
  });

  const updateTemplateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<LaboratoryTemplate> }) =>
      laboratoryService.updateTemplate(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laboratory-templates'] });
      toast({
        title: "Success",
        description: "Template updated successfully",
      });
    },
    onError: (error) => {
      console.error('Error updating template:', error);
      toast({
        title: "Error",
        description: "Failed to update template",
        variant: "destructive",
      });
    },
  });

  return {
    // Data
    samples,
    testResults,
    templates,
    equipment,
    metrics,
    
    // Loading states
    isLoading: samplesLoading || resultsLoading || templatesLoading || equipmentLoading,
    samplesLoading,
    resultsLoading,
    templatesLoading,
    equipmentLoading,
    metricsLoading,
    
    // Mutations
    createSample: createSampleMutation.mutate,
    updateSample: updateSampleMutation.mutate,
    createTestResult: createTestResultMutation.mutate,
    updateTestResult: updateTestResultMutation.mutate,
    createTemplate: createTemplateMutation.mutate,
    updateTemplate: updateTemplateMutation.mutate,
    
    // Mutation states
    isCreatingSample: createSampleMutation.isPending,
    isUpdatingSample: updateSampleMutation.isPending,
    isCreatingResult: createTestResultMutation.isPending,
    isUpdatingResult: updateTestResultMutation.isPending,
    isCreatingTemplate: createTemplateMutation.isPending,
    isUpdatingTemplate: updateTemplateMutation.isPending,
  };
};
