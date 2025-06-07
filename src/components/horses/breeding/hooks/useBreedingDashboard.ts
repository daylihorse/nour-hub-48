
import { useState, useEffect } from 'react';
import { 
  mockBreedingStats, 
  mockRecentActivity, 
  mockUpcomingEvents, 
  mockPregnancies 
} from '../config/dashboardConfig';

export const useBreedingDashboard = () => {
  const [stats, setStats] = useState(mockBreedingStats);
  const [recentActivity, setRecentActivity] = useState(mockRecentActivity);
  const [upcomingEvents, setUpcomingEvents] = useState(mockUpcomingEvents);
  const [pregnancies, setPregnancies] = useState(mockPregnancies);
  const [loading, setLoading] = useState(false);

  const refreshData = async () => {
    setLoading(true);
    try {
      // In a real app, this would fetch from an API
      // For now, we'll simulate a delay and return mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats(mockBreedingStats);
      setRecentActivity(mockRecentActivity);
      setUpcomingEvents(mockUpcomingEvents);
      setPregnancies(mockPregnancies);
    } catch (error) {
      console.error('Failed to refresh breeding dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial data load
    refreshData();
  }, []);

  return {
    stats,
    recentActivity,
    upcomingEvents,
    pregnancies,
    loading,
    refreshData,
  };
};
