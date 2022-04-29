import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICustomer} from "./model/ICustomer";
import {ICustomerType} from "./model/ICustomerType";
import {ICountries} from "./model/ICountries";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly URL_CUSTOMER = 'http://localhost:8080';
  private readonly URL_CUSTOMER_TYPE = 'http://localhost:8080';
  private readonly URL_COUNTRIES = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  getAllCustomer() {
    return this.httpClient.get<ICustomer[]>(this.URL_CUSTOMER + "/customer/list");
  }
  getAllCustomerType() {
    return  this.httpClient.get<ICustomerType[]>(this.URL_CUSTOMER_TYPE + "/customer/customerType-list")
  }
  getAllCountries() {
    return this.httpClient.get<ICountries[]>(this.URL_COUNTRIES + "/customer/country/api/v1")
  }




  // TinhHD lấy id
  finByIdCustomer(id: number) {
    return this.httpClient.get(this.URL_CUSTOMER +'/customer/'+ id)
  }
  //TinhHD thêm một đối tượng
  save(data: ICustomer): Observable<ICustomer> {
    return this.httpClient.post<ICustomer>(this.URL_CUSTOMER, data);
  }
  //TinhHD update một đối tượng
  updateCustomer(id, data) {
    return this.httpClient.patch(`${this.URL_CUSTOMER}/${id}`, data);
  }
}
