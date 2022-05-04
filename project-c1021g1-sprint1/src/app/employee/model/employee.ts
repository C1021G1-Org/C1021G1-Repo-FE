export interface Employee {
  id: number;
  nameEmployee:string;
  codeEmployee:string;
  genderEmployee:Boolean;
  birthdayEmployee:string;
  phoneEmployee:string;
  emailEmployee:string;
  addressEmployee:string;
  delFlagEmployee:Boolean;
  employeeType: EmployeeType;
}
export interface EmployeeType {
  id: number;
  nameEmployeeType:string;
}
