import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ICustomer} from "./model/ICustomer";
import {ICustomerType} from "./model/ICustomerType";
import {ICountries} from "./model/ICountries";

import {IPersonalDto} from "./model/IPersonalDto";
import {Observable} from "rxjs";
import {ICustomerDto} from "./dto/ICustomerDto";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly URL_BE = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; text/plain;charset=UTF-8',
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }


  constructor(private httpClient: HttpClient) {
  }

  //LongLT lấy list customer
  getAllCustomer(index: number) {
    return this.httpClient.get<ICustomer[]>(this.URL_BE + "/api/customer/list?page=" + index)
  }

  //LongLT lay id để xóa
  finByIdCustomers(id: number) {
    return this.httpClient.get<ICustomer>(this.URL_BE + '/api/customer/' + id)
  }

  //LongLT triển khai xóa
  deleteCustomer(idCustomer: number) {
    console.log(idCustomer)
    return this.httpClient.delete(this.URL_BE + '/api/customer/delete/' + idCustomer);
  }

  //LongLT triển khai tìm kiếm
  searchCustomer(value: string, value2: string, page: number) {
    return this.httpClient.get<any>(this.URL_BE + '/api/customer/search?option=' + value + '&keyword=' + value2 + '&page=' + page);
  }

  // ThangDBX lấy id
  findPersonalId(id: number) {
    return this.httpClient.get(this.URL_BE + '/api/customer/view/' + id);
  }

// ThangDBX update thong tin ca nhan
  updatePersonalInfo(id: number, data: IPersonalDto): Observable<IPersonalDto> {
    return this.httpClient.patch<IPersonalDto>(this.URL_BE + '/api/customer/edit/' + id, data)
  }

  getAllCustomerType() {
    return this.httpClient.get<ICustomerType[]>(this.URL_BE + "/customerType-list")
  }

  getAllCountries() {
    return this.httpClient.get<ICountries[]>(this.URL_BE + "/country/api/v1")
  }

  // TinhHD lấy id để sửa
  finByIdCustomer(id: number): Observable<ICustomerDto> {
    return this.httpClient.get<ICustomerDto>(this.URL_BE + '/api/customer/' + id)
  }

  //TinhHD thêm một đối tượng
  save(data: ICustomerDto): Observable<ICustomerDto> {
    return this.httpClient.post<ICustomerDto>(this.URL_BE + '/api/customer/create', JSON.stringify(data), this.httpOptions);
  }

  //TinhHD update một đối tượng
  updateCustomer(id: number, data): Observable<ICustomerDto> {
    return this.httpClient.patch<ICustomerDto>(this.URL_BE + '/api/customer/' + id, data);
  }
}
