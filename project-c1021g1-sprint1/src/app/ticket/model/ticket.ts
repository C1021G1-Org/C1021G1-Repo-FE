import {Employee} from "../../employee/model/employee";
import {Customer} from "../../customer/model/customer";
import {Seat} from "../../flight/model/flight";

export interface Ticket {
  id: number;
  codeTicket: string;
  emailTicket: string;
  phoneTicket: string;
  genderTicket: Boolean;
  statusTicket: Boolean;
  priceTicket: number;
  delFlagTicket: Boolean;
  pointTicket: number;
  idCard: string;
  dateTicket: string;
  birthdayTicket: string;
  employee: Employee;
  customer: Customer;
  seat: Seat;
}
