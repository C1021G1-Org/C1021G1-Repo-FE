import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ICustomer} from "./model/ICustomer";
import {ICustomerType} from "./model/ICustomerType";
import {ICountries} from "./model/ICountries";
import {Observable, throwError} from "rxjs";
import {ICustomerDto} from "./dto/ICustomerDto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

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

  getAllCustomer() {
    return this.httpClient.get<ICustomer[]>(this.URL_BE + "/api/customer/list");
  }

  getAllCustomerType() {
    return this.httpClient.get<ICustomerType[]>(this.URL_BE + "/customerType-list")
  }

  getAllCountries() {
    return this.httpClient.get<ICountries[]>(this.URL_BE + "/country/api/v1")
  }


  // TinhHD lấy id
  finByIdCustomer(id: number): Observable<ICustomerDto> {
    return this.httpClient.get<ICustomerDto>(this.URL_BE + '/api/customer/' + id)
  }

  //TinhHD thêm một đối tượng
  save(data: ICustomerDto): Observable<ICustomerDto> {
    return this.httpClient.post<ICustomerDto>(this.URL_BE + '/api/customer/create', JSON.stringify(data), this.httpOptions);
  }

  customer: ICustomerDto

  //TinhHD update một đối tượng
  updateCustomer(id: number, data): Observable<ICustomerDto> {
    console.log(id)
    console.log(data)
    return this.httpClient.patch<ICustomerDto>(this.URL_BE + '/api/customer/' + id, data);
  }
}
