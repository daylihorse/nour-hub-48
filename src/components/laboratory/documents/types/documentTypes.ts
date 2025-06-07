
export interface LaboratoryDocument {
  id: string;
  name: string;
  type: string;
  category: string;
  uploadDate: string;
  size: string;
  status: 'active' | 'archived';
}

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'protocols': return '📋';
    case 'equipment': return '⚙️';
    case 'quality': return '✅';
    case 'templates': return '📄';
    case 'reports': return '📊';
    default: return '📁';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'default';
    case 'archived': return 'secondary';
    default: return 'secondary';
  }
};
