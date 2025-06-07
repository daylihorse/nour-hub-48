
export interface Document {
  id: string;
  name: string;
  type: 'certificate' | 'medical' | 'legal' | 'photo' | 'other';
  size: string;
  uploadDate: Date;
  category: string;
  tags: string[];
  url?: string;
}

export const getTypeColor = (type: string) => {
  switch (type) {
    case 'certificate': return 'bg-blue-100 text-blue-700';
    case 'medical': return 'bg-red-100 text-red-700';
    case 'legal': return 'bg-purple-100 text-purple-700';
    case 'photo': return 'bg-green-100 text-green-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export const getTypeIcon = (type: string) => {
  switch (type) {
    case 'certificate': return '📜';
    case 'medical': return '🏥';
    case 'legal': return '📋';
    case 'photo': return '📸';
    default: return '📄';
  }
};
