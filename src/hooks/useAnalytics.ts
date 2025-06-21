
import { useState, useEffect, useCallback } from 'react';
import { AnalyticsMetric, AnalyticsInsight } from '@/types/analytics';
import { ReportTemplate, Dashboard } from '@/types/analytics';

// Mock data for demonstration
const generateMockMetrics = (): AnalyticsMetric[] => [
  {
    id: '1',
    name: 'Total Revenue',
    value: 125400,
    previousValue: 118200,
    change: 7200,
    changePercentage: 6.1,
    trend: 'up',
    category: 'financial',
    period: 'month',
    timestamp: new Date()
  },
  {
    id: '2',
    name: 'Active Horses',
    value: 143,
    previousValue: 138,
    change: 5,
    changePercentage: 3.6,
    trend: 'up',
    category: 'operational',
    period: 'month',
    timestamp: new Date()
  },
  {
    id: '3',
    name: 'Training Sessions',
    value: 89,
    previousValue: 92,
    change: -3,
    changePercentage: -3.3,
    trend: 'down',
    category: 'training',
    period: 'week',
    timestamp: new Date()
  },
  {
    id: '4',
    name: 'Client Satisfaction',
    value: 4.7,
    previousValue: 4.6,
    change: 0.1,
    changePercentage: 2.2,
    trend: 'up',
    category: 'service',
    period: 'month',
    timestamp: new Date()
  }
];

const generateMockInsights = (): AnalyticsInsight[] => [
  {
    id: '1',
    title: 'Revenue Growth Opportunity',
    description: 'Training program revenue has increased 15% this quarter. Consider expanding advanced programs.',
    type: 'recommendation',
    severity: 'medium',
    category: 'financial',
    data: { growth: 15, category: 'training' },
    action: 'Expand training programs',
    dismissed: false,
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Equipment Maintenance Alert',
    description: 'Several training equipment items are due for maintenance this week.',
    type: 'alert',
    severity: 'high',
    category: 'operational',
    data: { count: 7, category: 'equipment' },
    action: 'Schedule maintenance',
    dismissed: false,
    createdAt: new Date()
  }
];

export const useAnalytics = () => {
  const [metrics, setMetrics] = useState<AnalyticsMetric[]>([]);
  const [insights, setInsights] = useState<AnalyticsInsight[]>([]);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [reports, setReports] = useState<ReportTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = useCallback(async (category?: string, period?: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      let data = generateMockMetrics();
      
      if (category) {
        data = data.filter(metric => metric.category === category);
      }
      if (period) {
        data = data.filter(metric => metric.period === period);
      }
      
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchInsights = useCallback(async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setInsights(generateMockInsights());
    } catch (error) {
      console.error('Error fetching insights:', error);
    }
  }, []);

  const generateReport = async (templateId: string, parameters: Record<string, any>) => {
    try {
      console.log('Generating report:', templateId, parameters);
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      return {
        id: `report_${Date.now()}`,
        url: '/downloads/report.pdf',
        status: 'completed'
      };
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  };

  const exportData = async (data: any[], format: 'csv' | 'excel' | 'pdf') => {
    try {
      console.log('Exporting data:', format, data.length, 'records');
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        url: `/downloads/export.${format}`,
        filename: `export_${Date.now()}.${format}`
      };
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  };

  const dismissInsight = (insightId: string) => {
    setInsights(prev => prev.map(insight => 
      insight.id === insightId ? { ...insight, dismissed: true } : insight
    ));
  };

  useEffect(() => {
    fetchMetrics();
    fetchInsights();
  }, [fetchMetrics, fetchInsights]);

  return {
    metrics,
    insights,
    dashboards,
    reports,
    loading,
    fetchMetrics,
    fetchInsights,
    generateReport,
    exportData,
    dismissInsight,
    refetch: () => {
      fetchMetrics();
      fetchInsights();
    }
  };
};
