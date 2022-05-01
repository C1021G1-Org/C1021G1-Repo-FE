import {ICountries} from "../model/ICountries";
import {ICustomerType} from "../model/ICustomerType";

export interface ICustomerDto {
  id: number;
  nameCustomer: string;
  genderCustomer: boolean;
  birthdayCustomer: string;
  idCardCustomer: string;
  phoneCustomer: string;
  emailCustomer: string;
  addressCustomer: string;
  delFlagCustomer: boolean;
  countries: number;
  customerType: number;
}
