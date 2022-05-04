import {EmployeeType} from "./employeeType";

export interface Employee{
  id: number;
  name: string;
  code: string;
  gender: boolean;
  birthday: string;
  phone: string;
  email: string;
  address: string;
  employeeType: EmployeeType;
}
