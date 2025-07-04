import { TranslationKeys } from './en';

export const arTranslations: TranslationKeys = {
  // Navigation & Layout
  navigation: {
    dashboard: "لوحة التحكم",
    horses: "الخيول",
    breeding: "التربية", 
    pedigree: "النسب",
    training: "التدريب",
    health: "الصحة",
    performance: "الأداء"
  },

  // Common Actions
  actions: {
    add: "إضافة",
    new: "جديد",
    edit: "تعديل",
    delete: "حذف",
    save: "حفظ",
    cancel: "إلغاء",
    next: "التالي",
    previous: "السابق",
    search: "بحث",
    filter: "تصفية",
    export: "تصدير",
    import: "استيراد",
    view: "عرض",
    close: "إغلاق",
    submit: "إرسال",
    reset: "إعادة تعيين",
  },

  // Dashboard
  dashboard: {
    title: "لوحة التحكم",
    subtitle: "إدارة مرفق الخيول الخاص بك",
    welcome: "مرحباً بك في نظام إدارة الخيول"
  },

  // Horses Department
  horses: {
    title: "قسم الخيول",
    subtitle: "إدارة جميع خيولك ومعلوماتها"
  },

  // Horse Form
  horseForm: {
    title: "تسجيل حصان جديد",
    subtitle: "تسجيل حصان جديد في الإسطبل",
    stages: {
      basicInfo: "المعلومات الأساسية",
      ownership: "الملكية والوثائق",
      pedigree: "النسب",
      health: "الصحة والطب",
      training: "التدريب والأداء",
      stable: "إدارة الإسطبل",
      insurance: "التأمين والمالية",
      documents: "الوثائق والصور",
      review: "المراجعة والتأكيد",
    },
    fields: {
      horseName: "اسم الحصان",
      arabicName: "الاسم العربي",
      breed: "السلالة",
      gender: "الجنس",
      birthDate: "تاريخ الميلاد",
      color: "اللون",
      height: "الارتفاع (يد)",
      weight: "الوزن (كيلو)",
      ownerType: "نوع المالك",
      ownerName: "اسم المالك",
      ownerContact: "تواصل المالك",
      sire: "الأب",
      dam: "الأم",
      bloodlineOrigin: "أصل النسب",
      healthStatus: "الحالة الصحية",
      vaccinationStatus: "حالة التطعيم",
      lastVetCheckup: "آخر فحص بيطري",
      trainingLevel: "مستوى التدريب",
      stallNumber: "رقم الحظيرة",
      feedingSchedule: "جدول التغذية",
      exerciseRoutine: "روتين التمرين",
    },
    placeholders: {
      enterHorseName: "أدخل اسم الحصان",
      selectBreed: "اختر السلالة",
      selectGender: "اختر الجنس",
      pickDate: "اختر التاريخ",
      selectColor: "اختر اللون",
      enterOwnerName: "أدخل اسم المالك",
      phoneOrEmail: "رقم الهاتف أو البريد الإلكتروني",
    },
  },

  // Breeding
  breeding: {
    title: "إدارة التربية",
    dashboard: "لوحة التحكم",
    mares: "الأفراس",
    stallions: "الفحول",
    geldings: "الخصيان",
    foaling: "الولادة",
    planning: "التخطيط",
    analysis: "التحليل",
    documents: "المستندات",
    certificates: "الشهادات",
    pregnancy: "الحمل",
    frozenEmbryo: "الأجنة المجمدة",
    heatCycles: "دورات الشبق",
    totalMares: "إجمالي الأفراس",
    activeMares: "الأفراس النشطة",
    pregnantMares: "الأفراس الحوامل",
    addMare: "إضافة فرس",
    mareDetails: "تفاصيل الفرس",
    breedingHistory: "تاريخ التربية",
    foalingHistory: "تاريخ الولادة",
    frozenEmbryoManagement: "إدارة الأجنة المجمدة",
    cryopreservedInventory: "إدارة مخزون الأجنة المحفوظة بالتبريد وتتبعها",
  },

  // Health Records
  health: {
    title: "السجلات الصحية",
    vetCheckup: "فحص بيطري",
    vaccination: "تطعيم",
    medication: "دواء",
    treatment: "علاج",
    healthStatus: "الحالة الصحية",
    medicalConditions: "الحالات الطبية",
    allergies: "الحساسية",
    scheduleCheckup: "جدولة فحص",
    viewRecords: "عرض السجلات الطبية",
  },

  // Training
  training: {
    title: "سجلات التدريب",
    level: "مستوى التدريب",
    disciplines: "التخصصات",
    sessions: "جلسات التدريب",
    progress: "التقدم",
    instructor: "المدرب",
    notes: "ملاحظات التدريب",
  },

  // Performance
  performance: {
    title: "سجلات الأداء",
    competitions: "المسابقات",
    achievements: "الإنجازات",
    awards: "الجوائز",
    statistics: "الإحصائيات",
    rankings: "التصنيفات",
  },

  // Common UI
  ui: {
    loading: "جاري التحميل...",
    noData: "لا توجد بيانات متاحة",
    error: "حدث خطأ",
    success: "نجح",
    warning: "تحذير",
    info: "معلومات",
    confirm: "تأكيد",
    areYouSure: "هل أنت متأكد؟",
    thisActionCannotBeUndone: "لا يمكن التراجع عن هذا الإجراء",
    itemsPerPage: "عناصر لكل صفحة",
    showingResults: "عرض {start} إلى {end} من {total} نتيجة",
  },

  // Status
  status: {
    active: "نشط",
    inactive: "غير نشط",
    healthy: "صحي",
    injured: "مصاب",
    pregnant: "حامل",
    available: "متاح",
    retired: "متقاعد",
    inTraining: "في التدريب",
    competing: "في المنافسة",
  },

  // Gender
  gender: {
    male: "ذكر",
    female: "أنثى",
    stallion: "فحل",
    mare: "فرس",
    gelding: "خصي",
  },

  // View Modes
  viewModes: {
    grid: "عرض الشبكة",
    list: "عرض القائمة",
    table: "عرض الجدول",
  },

  // Clients
  clients: {
    profile: {
      title: "ملف العميل",
      subtitle: "عرض وإدارة معلومات العميل",
      details: "تفاصيل العميل",
      clientId: "معرف العميل",
      comingSoon: "ميزات ملف العميل قادمة قريباً..."
    }
  }
};
