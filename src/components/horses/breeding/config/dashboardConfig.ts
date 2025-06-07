
import { BREEDING_STATUS, BREEDING_EVENTS, PREGNANCY_DEFAULTS } from '../constants/breedingConstants';

export const mockBreedingStats = {
  totalStallions: 8,
  activeStallions: 6,
  totalMares: 25,
  pregnantMares: 7,
  expectedFoals: 7,
  totalBookings: 12,
  successRate: 85.5,
};

export const mockRecentActivity = [
  {
    id: 1,
    type: BREEDING_EVENTS.BREEDING,
    message: "Breeding completed: Thunder × Lightning",
    date: "2 hours ago",
    status: BREEDING_STATUS.SUCCESS,
  },
  {
    id: 2,
    type: BREEDING_EVENTS.PREGNANCY,
    message: "Pregnancy confirmed: Bella (Day 18)",
    date: "1 day ago",
    status: BREEDING_STATUS.SUCCESS,
  },
  {
    id: 3,
    type: BREEDING_EVENTS.BOOKING,
    message: "New booking request: Storm × Aurora",
    date: "2 days ago",
    status: BREEDING_STATUS.PENDING,
  },
  {
    id: 4,
    type: BREEDING_EVENTS.BIRTH,
    message: "Foal born: Whisper's colt",
    date: "3 days ago",
    status: BREEDING_STATUS.SUCCESS,
  },
];

export const mockUpcomingEvents = [
  {
    id: 1,
    type: BREEDING_EVENTS.DUE_DATE,
    title: "Expected Foaling",
    horse: "Bella",
    date: "2024-01-15",
    priority: "high",
  },
  {
    id: 2,
    type: BREEDING_EVENTS.CHECKUP,
    title: "Pregnancy Checkup",
    horse: "Luna",
    date: "2024-01-10",
    priority: "medium",
  },
  {
    id: 3,
    type: BREEDING_EVENTS.BREEDING,
    title: "Scheduled Breeding",
    horse: "Thunder × Storm",
    date: "2024-01-08",
    priority: "medium",
  },
];

export const mockPregnancies = [
  {
    name: "Bella",
    currentDay: 280,
    totalDays: PREGNANCY_DEFAULTS.TOTAL_DAYS,
    expectedDate: "Jan 15, 2024",
  },
  {
    name: "Luna",
    currentDay: 180,
    totalDays: PREGNANCY_DEFAULTS.TOTAL_DAYS,
    expectedDate: "Mar 20, 2024",
  },
  {
    name: "Aurora",
    currentDay: 45,
    totalDays: PREGNANCY_DEFAULTS.TOTAL_DAYS,
    expectedDate: "Sep 15, 2024",
  },
];
