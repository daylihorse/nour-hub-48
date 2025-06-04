
export interface EnhancedTestResult {
  id: string;
  sampleId: string;
  horseName: string;
  horsePhoto?: string;
  testType: string;
  completedDate: string;
  status: 'normal' | 'abnormal' | 'critical';
  technician: string;
  reviewedBy: string;
  findings: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  values: Array<{
    parameter: string;
    value: string;
    unit: string;
    reference: string;
    status: 'normal' | 'high' | 'low';
  }>;
  historicalResults?: Array<{
    date: string;
    values: Array<{
      parameter: string;
      value: string;
      unit: string;
      status: 'normal' | 'high' | 'low';
    }>;
  }>;
}

export const enhancedTestResults: EnhancedTestResult[] = [
  {
    id: "TR001",
    sampleId: "S001",
    horseName: "Thunder",
    horsePhoto: "/placeholder.svg",
    testType: "Complete Blood Count",
    completedDate: "2024-06-03",
    status: "normal",
    technician: "Lab Tech A",
    reviewedBy: "Dr. Smith",
    findings: "All parameters within normal ranges",
    clientName: "John Doe",
    clientPhone: "+1-555-0123",
    clientEmail: "john.doe@email.com",
    values: [
      { parameter: "White Blood Cells", value: "6.5", unit: "x10³/μL", reference: "5.0-10.0", status: "normal" },
      { parameter: "Red Blood Cells", value: "8.2", unit: "x10⁶/μL", reference: "6.5-12.0", status: "normal" },
      { parameter: "Hemoglobin", value: "14.5", unit: "g/dL", reference: "11.0-18.0", status: "normal" }
    ],
    historicalResults: [
      {
        date: "2024-05-15",
        values: [
          { parameter: "White Blood Cells", value: "6.2", unit: "x10³/μL", status: "normal" },
          { parameter: "Red Blood Cells", value: "8.0", unit: "x10⁶/μL", status: "normal" },
          { parameter: "Hemoglobin", value: "14.2", unit: "g/dL", status: "normal" }
        ]
      }
    ]
  },
  {
    id: "TR002",
    sampleId: "S002",
    horseName: "Bella",
    horsePhoto: "/placeholder.svg",
    testType: "Urinalysis",
    completedDate: "2024-06-02",
    status: "abnormal",
    technician: "Lab Tech B",
    reviewedBy: "Dr. Johnson",
    findings: "Elevated protein levels detected",
    clientName: "Jane Smith",
    clientPhone: "+1-555-0124",
    clientEmail: "jane.smith@email.com",
    values: [
      { parameter: "Protein", value: "150", unit: "mg/dL", reference: "0-30", status: "high" },
      { parameter: "Glucose", value: "Negative", unit: "", reference: "Negative", status: "normal" },
      { parameter: "Specific Gravity", value: "1.025", unit: "", reference: "1.020-1.050", status: "normal" }
    ],
    historicalResults: [
      {
        date: "2024-04-20",
        values: [
          { parameter: "Protein", value: "25", unit: "mg/dL", status: "normal" },
          { parameter: "Glucose", value: "Negative", unit: "", status: "normal" },
          { parameter: "Specific Gravity", value: "1.022", unit: "", status: "normal" }
        ]
      }
    ]
  },
  {
    id: "TR003",
    sampleId: "S003",
    horseName: "Shadow",
    horsePhoto: "/placeholder.svg",
    testType: "Parasite Screening",
    completedDate: "2024-06-05",
    status: "normal",
    technician: "Lab Tech C",
    reviewedBy: "Dr. Brown",
    findings: "No parasites detected",
    clientName: "David Brown",
    clientPhone: "+1-555-0125",
    clientEmail: "david.brown@email.com",
    values: [
      { parameter: "Strongyles", value: "Negative", unit: "", reference: "Negative", status: "normal" },
      { parameter: "Roundworms", value: "Negative", unit: "", reference: "Negative", status: "normal" },
      { parameter: "Tapeworms", value: "Negative", unit: "", reference: "Negative", status: "normal" }
    ]
  }
];

export const getEnhancedTestResults = () => enhancedTestResults;
