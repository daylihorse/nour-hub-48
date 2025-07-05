import { 
  Gender, 
  AgeClass, 
  AdultMaleType, 
  AgeCalculationResult, 
  ClassificationRules,
  HorseClassification 
} from "@/types/horse-classification";

/**
 * Calculate detailed age information from birth date
 */
export const calculateAge = (birthDate: string): AgeCalculationResult => {
  const today = new Date();
  const birth = new Date(birthDate);
  
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();
  
  // Adjust for negative days
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }
  
  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Calculate total days for precise calculations
  const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    years,
    months,
    days,
    totalDays,
    isUnder3Years: years < 3
  };
};

/**
 * Get classification rules based on age and gender
 */
export const getClassificationRules = (age: AgeCalculationResult, gender: Gender): ClassificationRules => {
  const isUnder3Years = age.isUnder3Years;
  const isMale = gender === 'male';
  const isFemale = gender === 'female';
  
  let availableClasses: AgeClass[] = [];
  let requiresAdultMaleType = false;
  let allowsPregnancy = false;
  
  if (isUnder3Years) {
    // Under 3 years: Auto-classify based on gender
    if (isMale) {
      availableClasses = age.years === 0 ? ['foal'] : ['colt'];
    } else {
      availableClasses = age.years === 0 ? ['foal'] : ['filly'];
    }
  } else {
    // 3 years and older: Show appropriate options
    if (isMale) {
      availableClasses = ['stallion', 'gelding'];
      requiresAdultMaleType = true;
    } else {
      availableClasses = ['mare'];
      allowsPregnancy = true;
    }
  }
  
  return {
    isUnder3Years,
    isMale,
    isFemale,
    availableClasses,
    requiresAdultMaleType,
    allowsPregnancy
  };
};

/**
 * Auto-classify horse based on age and gender
 */
export const autoClassifyHorse = (birthDate: string, gender: Gender): Partial<HorseClassification> => {
  const age = calculateAge(birthDate);
  const rules = getClassificationRules(age, gender);
  
  const result: Partial<HorseClassification> = {
    gender,
    birthDate
  };
  
  // Auto-assign age class for horses under 3 years
  if (rules.isUnder3Years && rules.availableClasses.length === 1) {
    result.ageClass = rules.availableClasses[0];
  }
  
  return result;
};

/**
 * Validate horse classification
 */
export const validateClassification = (classification: HorseClassification): string[] => {
  const errors: string[] = [];
  const age = calculateAge(classification.birthDate);
  const rules = getClassificationRules(age, classification.gender);
  
  // Check if age class is valid for the age and gender
  if (classification.ageClass && !rules.availableClasses.includes(classification.ageClass)) {
    errors.push(`Age class "${classification.ageClass}" is not valid for a ${age.years}-year-old ${classification.gender}`);
  }
  
  // Check adult male type requirements
  if (rules.requiresAdultMaleType && !classification.adultMaleType) {
    errors.push('Adult male type (stallion/gelding) is required for males 3 years and older');
  }
  
  // Check castration date for geldings
  if (classification.adultMaleType === 'gelding' && !classification.castrationDate) {
    errors.push('Castration date is required for geldings');
  }
  
  // Check pregnancy status for mares
  if (rules.allowsPregnancy && classification.ageClass === 'mare' && !classification.isPregnant) {
    errors.push('Pregnancy status is required for mares');
  }
  
  return errors;
};

/**
 * Get display name for age class
 */
export const getAgeClassDisplayName = (ageClass: AgeClass, gender?: Gender): string => {
  const displayNames: Record<AgeClass, string> = {
    foal: 'Foal (under 1 year)',
    colt: 'Colt (1-2 years, male)',
    filly: 'Filly (1-2 years, female)',
    stallion: 'Stallion (adult male, intact)',
    gelding: 'Gelding (adult male, castrated)',
    mare: 'Mare (adult female)'
  };
  
  return displayNames[ageClass];
};

/**
 * Format age for display
 */
export const formatAge = (age: AgeCalculationResult): string => {
  if (age.years === 0) {
    if (age.months === 0) {
      return `${age.days} days`;
    } else {
      return `${age.months} months, ${age.days} days`;
    }
  } else {
    return `${age.years} years, ${age.months} months`;
  }
};