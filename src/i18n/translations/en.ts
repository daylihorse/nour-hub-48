
export const enTranslations = {
  // Navigation & Layout
  navigation: {
    dashboard: "Dashboard",
    horses: "Horse Registry",
    breeding: "Breeding",
    pedigree: "Pedigree",
    training: "Training",
    health: "Health Records",
    performance: "Performance Records",
    clinic: "Clinic",
    finance: "Finance",
    clients: "Clients",
  },

  // Common Actions
  actions: {
    add: "Add",
    new: "New",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    next: "Next",
    previous: "Previous",
    search: "Search",
    filter: "Filter",
    export: "Export",
    import: "Import",
    view: "View",
    close: "Close",
    submit: "Submit",
    reset: "Reset",
  },

  // Dashboard
  dashboard: {
    title: "Module Access Center",
    subtitle: "Manage your organization with powerful integrated modules",
    welcome: "Welcome to Dayli Horse Management System",
    quickStats: "Quick Statistics",
    recentActivity: "Recent Activity",
    upcomingEvents: "Upcoming Events",
  },

  // Horses Department
  horses: {
    title: "Horses Department",
    subtitle: "Comprehensive horse management and monitoring system",
    registry: "Horse Registry",
    totalHorses: "Total Horses",
    activeHorses: "Active Horses",
    addHorse: "Add New Horse",
    horseDetails: "Horse Details",
    basicInfo: "Basic Information",
    medicalHistory: "Medical History",
    trainingRecords: "Training Records",
    performanceRecords: "Performance Records",
  },

  // Horse Form
  horseForm: {
    title: "Register New Horse",
    subtitle: "Register a new horse in the stable",
    stages: {
      basicInfo: "Basic Information",
      ownership: "Ownership & Documentation",
      pedigree: "Pedigree",
      health: "Health & Medical",
      training: "Training & Performance",
      stable: "Stable Management",
      insurance: "Insurance & Financial",
      documents: "Documents & Images",
      review: "Review & Confirmation",
    },
    fields: {
      horseName: "Horse Name",
      arabicName: "Arabic Name",
      breed: "Breed",
      gender: "Gender",
      birthDate: "Birth Date",
      color: "Color",
      height: "Height (hands)",
      weight: "Weight (kg)",
      ownerType: "Owner Type",
      ownerName: "Owner Name",
      ownerContact: "Owner Contact",
      sire: "Sire",
      dam: "Dam",
      bloodlineOrigin: "Bloodline Origin",
      healthStatus: "Health Status",
      vaccinationStatus: "Vaccination Status",
      lastVetCheckup: "Last Vet Checkup",
      trainingLevel: "Training Level",
      stallNumber: "Stall Number",
      feedingSchedule: "Feeding Schedule",
      exerciseRoutine: "Exercise Routine",
    },
    placeholders: {
      enterHorseName: "Enter horse name",
      selectBreed: "Select breed",
      selectGender: "Select gender",
      pickDate: "Pick a date",
      selectColor: "Select color",
      enterOwnerName: "Enter owner name",
      phoneOrEmail: "Phone number or email",
    },
  },

  // Breeding
  breeding: {
    title: "Breeding Management",
    dashboard: "Dashboard",
    mares: "Mares",
    stallions: "Stallions",
    geldings: "Geldings",
    foaling: "Foaling",
    planning: "Planning",
    analysis: "Analysis",
    documents: "Documents",
    certificates: "Certificates",
    pregnancy: "Pregnancy",
    frozenEmbryo: "Frozen Embryo",
    heatCycles: "Heat Cycles",
    totalMares: "Total Mares",
    activeMares: "Active Mares",
    pregnantMares: "Pregnant Mares",
    addMare: "Add Mare",
    mareDetails: "Mare Details",
    breedingHistory: "Breeding History",
    foalingHistory: "Foaling History",
    frozenEmbryoManagement: "Frozen Embryo Management",
    cryopreservedInventory: "Manage cryopreserved embryo inventory and tracking",
  },

  // Health Records
  health: {
    title: "Health Records",
    vetCheckup: "Vet Checkup",
    vaccination: "Vaccination",
    medication: "Medication",
    treatment: "Treatment",
    healthStatus: "Health Status",
    medicalConditions: "Medical Conditions",
    allergies: "Allergies",
    scheduleCheckup: "Schedule Checkup",
    viewRecords: "View Medical Records",
  },

  // Training
  training: {
    title: "Training Records",
    level: "Training Level",
    disciplines: "Disciplines",
    sessions: "Training Sessions",
    progress: "Progress",
    instructor: "Instructor",
    notes: "Training Notes",
  },

  // Performance
  performance: {
    title: "Performance Records",
    competitions: "Competitions",
    achievements: "Achievements",
    awards: "Awards",
    statistics: "Statistics",
    rankings: "Rankings",
  },

  // Common UI
  ui: {
    loading: "Loading...",
    noData: "No data available",
    error: "An error occurred",
    success: "Success",
    warning: "Warning",
    info: "Information",
    confirm: "Confirm",
    areYouSure: "Are you sure?",
    thisActionCannotBeUndone: "This action cannot be undone",
    itemsPerPage: "Items per page",
    showingResults: "Showing {start} to {end} of {total} results",
  },

  // Status
  status: {
    active: "Active",
    inactive: "Inactive",
    healthy: "Healthy",
    injured: "Injured",
    pregnant: "Pregnant",
    available: "Available",
    retired: "Retired",
    inTraining: "In Training",
    competing: "Competing",
  },

  // Gender
  gender: {
    male: "Male",
    female: "Female",
    stallion: "Stallion",
    mare: "Mare",
    gelding: "Gelding",
  },

  // View Modes
  viewModes: {
    grid: "Grid View",
    list: "List View",
    table: "Table View",
  },
};

export type TranslationKeys = typeof enTranslations;
