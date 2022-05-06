import {EmployeeType} from "./employeeType";

export interface Employee{
  id: number;
  name_Employee: string;
  code_Employee: string;
  gender_Employee: boolean;
  birthday_Employee: string;
  phone_Employee: string;
  email_Employee: string;
  address_Employee: string;
  employeeType: EmployeeType;
}
