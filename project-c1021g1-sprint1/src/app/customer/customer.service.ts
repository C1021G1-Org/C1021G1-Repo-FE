import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICustomer} from "./model/ICustomer";
import {ICustomerType} from "./model/ICustomerType";
import {ICountries} from "./model/ICountries";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly URL_CUSTOMER = 'http://localhost:8080';
  private readonly URL_CUSTOMERTYPE = 'http://localhost:8080';
  private readonly URL_COUNTRIES = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  getAllCustomer() {
    return this.httpClient.get<ICustomer[]>(this.URL_CUSTOMER + "/customer/list");
  }
  getAllCustomerType() {
    return  this.httpClient.get<ICustomerType[]>(this.URL_CUSTOMERTYPE + "/customer/customerType")
  }
  getAllCountries() {
    return this.httpClient.get<ICountries[]>(this.URL_COUNTRIES + "/customer/countries")
  }
  finByIdCustomer(id: number) {
    return this.httpClient.get(this.URL_CUSTOMER +'/'+ id)
  }
}
