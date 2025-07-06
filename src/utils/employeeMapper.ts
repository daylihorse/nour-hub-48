
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

export const mapEmployeeToDatabaseEmployee = (employee: Employee): Omit<DatabaseEmployee, 'id' | 'tenant_id' | 'created_at' | 'updated_at'> => {
  return {
    employee_number: undefined,
    first_name: employee.firstName || '',
    last_name: employee.lastName || '',
    email: employee.email,
    phone: employee.phones.length > 0 ? employee.phones[0].number : undefined,
    hire_date: employee.hireDate.toISOString().split('T')[0],
    position: employee.position || '',
    department: employee.department.length > 0 ? employee.department[0] : '',
    salary: employee.salary,
    status: employee.status === 'active' ? 'active' : 
            employee.status === 'inactive' ? 'inactive' : 'terminated',
    emergency_contact: undefined,
    address: employee.address ? {
      street: employee.address.street,
      city: employee.address.city,
      state: employee.address.state,
      zipCode: employee.address.zipCode,
      country: employee.address.country,
    } : undefined,
  };
};
