
export const calculateAge = (birthDate: Date): string => {
  const now = new Date();
  const birth = new Date(birthDate);
  
  if (birth > now) {
    return "Invalid date (future date)";
  }
  
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();
  
  // Adjust for negative days
  if (days < 0) {
    months--;
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += lastMonth.getDate();
  }
  
  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Format the result
  const parts = [];
  if (years > 0) parts.push(`${years} year${years !== 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`);
  if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
  
  return parts.length > 0 ? parts.join(', ') : 'Less than a day';
};

export const calculateAgeArabic = (birthDate: Date): string => {
  const now = new Date();
  const birth = new Date(birthDate);
  
  if (birth > now) {
    return "تاريخ غير صحيح (تاريخ مستقبلي)";
  }
  
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();
  
  // Adjust for negative days
  if (days < 0) {
    months--;
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += lastMonth.getDate();
  }
  
  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Format the result in Arabic
  const parts = [];
  if (years > 0) {
    if (years === 1) {
      parts.push('سنة واحدة');
    } else if (years === 2) {
      parts.push('سنتان');
    } else if (years >= 3 && years <= 10) {
      parts.push(`${years} سنوات`);
    } else {
      parts.push(`${years} سنة`);
    }
  }
  
  if (months > 0) {
    if (months === 1) {
      parts.push('شهر واحد');
    } else if (months === 2) {
      parts.push('شهران');
    } else if (months >= 3 && months <= 10) {
      parts.push(`${months} أشهر`);
    } else {
      parts.push(`${months} شهراً`);
    }
  }
  
  if (days > 0) {
    if (days === 1) {
      parts.push('يوم واحد');
    } else if (days === 2) {
      parts.push('يومان');
    } else if (days >= 3 && days <= 10) {
      parts.push(`${days} أيام`);
    } else {
      parts.push(`${days} يوماً`);
    }
  }
  
  return parts.length > 0 ? parts.join('، ') : 'أقل من يوم';
};
