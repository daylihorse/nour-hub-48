
export interface Employee {
  id: string;
  firstName: string;
  firstNameArabic?: string;
  lastName: string;
  lastNameArabic?: string;
  nickname?: string;
  nicknameArabic?: string;
  email: string;
  phones: {
    id: string;
    countryCode: string;
    number: string;
    hasWhatsapp: boolean;
    hasTelegram: boolean;
  }[];
  position: string;
  positions?: string;
  otherPosition?: string;
  department: string[];
  hireDate: Date;
  salary?: number;
  currency?: string;
  salaryType?: 'daily' | 'monthly';
  status: 'active' | 'inactive' | 'on-leave';
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  date: Date;
  reviewer: string;
  rating: number;
  strengths: string;
  areasOfImprovement: string;
  goals: string;
  comments: string;
}

export interface TrainingRecord {
  id: string;
  employeeId: string;
  trainingName: string;
  provider: string;
  startDate: Date;
  endDate?: Date;
  completionStatus: 'completed' | 'in-progress' | 'scheduled' | 'cancelled';
  certificateExpiry?: Date;
  description?: string;
}

export interface WorkSchedule {
  id: string;
  employeeId: string;
  startDate: Date;
  endDate?: Date;
  shifts: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  payPeriodStart: Date;
  payPeriodEnd: Date;
  grossPay: number;
  deductions: number;
  netPay: number;
  paymentDate: Date;
  paymentMethod: string;
  status: 'paid' | 'pending' | 'cancelled';
}
