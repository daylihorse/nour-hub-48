
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'high': return 'text-red-600 bg-red-50';
    case 'low': return 'text-yellow-600 bg-yellow-50';
    case 'normal': return 'text-green-600 bg-green-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

export const calculateStatus = (value: string, reference: string): 'normal' | 'high' | 'low' => {
  const numericValue = parseFloat(value);
  
  if (reference.includes('-')) {
    const [min, max] = reference.split('-').map(v => parseFloat(v.trim()));
    if (!isNaN(numericValue) && !isNaN(min) && !isNaN(max)) {
      if (numericValue < min) {
        return 'low';
      } else if (numericValue > max) {
        return 'high';
      } else {
        return 'normal';
      }
    }
  }
  
  return 'normal';
};
