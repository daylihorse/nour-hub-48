
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return Loader2;
    case 'success':
      return CheckCircle;
    case 'error':
      return AlertCircle;
    default:
      return null;
  }
};

export const getTenantTypeColor = (type: string) => {
  switch (type) {
    case 'stable': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'clinic': return 'bg-green-100 text-green-800 border-green-200';
    case 'laboratory': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'hospital': return 'bg-red-100 text-red-800 border-red-200';
    case 'marketplace': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'enterprise': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getRoleColor = (role: string) => {
  switch (role) {
    case 'owner': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'admin': return 'bg-red-100 text-red-800 border-red-200';
    case 'manager': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'employee': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};
