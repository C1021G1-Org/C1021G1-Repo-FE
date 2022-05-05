import {EmployeeType} from "./EmployeeType";

export interface Employee {
  id: number;
  nameEmployee: string;
  phoneEmployee: string;
  addressEmployee: string;
  birthdayEmployee: string;
  codeEmployee: string;
  delFlagEmployee: boolean;
  emailEmployee: string;
  genderEmployee: string;
  employeeType: EmployeeType;
}
