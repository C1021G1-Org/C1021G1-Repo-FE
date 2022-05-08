import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ICustomer} from "./model/ICustomer";
import {ICustomerType} from "./model/ICustomerType";
import {ICountries} from "./model/ICountries";
import {IPersonalDto} from "./model/IPersonalDto";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly URL_BE = 'http://localhost:8080/api';
  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  //LongLT lấy list customer
  getAllCustomer(index: number) {
        return this.httpClient.get<ICustomer[]>(this.URL_BE + "/customer/list?page=" + index)
  }

  //LongLT lấy list customerType
  getAllCustomerType() {
    return  this.httpClient.get<ICustomerType[]>(this.URL_BE + "/customerType")
  }
  //LongLT lấy list country
  getAllCountries() {
    return this.httpClient.get<ICountries[]>(this.URL_BE + "/customer/countries")
  }

  //LongLT laays id
  finByIdCustomer(id: number) {
    return this.httpClient.get<ICustomer>(this.URL_BE +'/customer/'+ id)
  }
  //LongLT triển khai xóa
  deleteCustomer(idCustomer: number){
    return this.httpClient.delete(this.URL_BE + '/customer/delete/'+ idCustomer);
  }
  //LongLT triển khai tìm kiếm
  searchCustomer(value: string, value2: string, page: number) {
      return this.httpClient.get<any>(this.URL_BE + '/customer/search?option=' + value + '&keyword=' + value2 + '&page=' + page);
  }
  // ThangDBX lấy id
  findPersonalId(id : number){
    return this.httpClient.get(this.URL_BE + '/customer/view/' + id);
  }

// ThangDBX update thong tin ca nhan
  updatePersonalInfo(id : number, data : IPersonalDto): Observable<IPersonalDto>{
    return this.httpClient.patch<IPersonalDto>(this.URL_BE + '/customer/edit/' + id, data)
  }
}
