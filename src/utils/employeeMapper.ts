
import { DatabaseEmployee } from '@/hooks/useEmployees';
import { Employee } from '@/types/employee';

export const mapDatabaseEmployeeToEmployee = (dbEmployee: DatabaseEmployee): Employee => {
  return {
    id: dbEmployee.id,
    firstName: dbEmployee.first_name,
    lastName: dbEmployee.last_name,
    email: dbEmployee.email,
    phones: dbEmployee.phone ? [{
      id: '1',
      countryCode: '+1',
      number: dbEmployee.phone,
      hasWhatsapp: false,
      hasTelegram: false,
    }] : [],
    position: dbEmployee.position,
    department: [dbEmployee.department],
    hireDate: new Date(dbEmployee.hire_date),
    salary: dbEmployee.salary,
    status: dbEmployee.status === 'active' ? 'active' : 
            dbEmployee.status === 'inactive' ? 'inactive' : 'on-leave',
    address: dbEmployee.address ? {
      street: dbEmployee.address.street,
      city: dbEmployee.address.city,
      state: dbEmployee.address.state,
      zipCode: dbEmployee.address.zipCode,
      country: dbEmployee.address.country,
    } : undefined,
  };
};

export const mapDatabaseEmployeesToEmployees = (dbEmployees: DatabaseEmployee[]): Employee[] => {
  return dbEmployees.map(mapDatabaseEmployeeToEmployee);
};
