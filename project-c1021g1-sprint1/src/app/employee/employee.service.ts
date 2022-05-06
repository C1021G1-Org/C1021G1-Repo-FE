import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employee} from "./model/employee";
import {EmployeeType} from "./model/employeeType";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly employeeURL = 'http://localhost:8080/api/employee'



  constructor(private httpClient: HttpClient) { }

  getAllEmployee(number: number) {
    return this.httpClient.get(this.employeeURL + '?page=' + number);
  }

  getAllEmployeeNotPagination() {
    return this.httpClient.get(this.employeeURL + '/not-pagination')
  }

  deleteEmployee(id: number){
    return this.httpClient.delete(this.employeeURL + '/delete/' + id);
  }

  findById(id: number) {
    return this.httpClient.get(this.employeeURL + '/' + id);
  }

  search(name: string, code: string, email: string, page: number) {
    return this.httpClient.get(this.employeeURL + '/search?name=' + name + '&code=' + code + '&email=' + email + '&page=' + page);
  }
  createEmployee(employee: Employee){
    console.log(employee)
    return this.httpClient.post('http://localhost:8080/api/employee/createEmployee' , employee ,{headers:{'content-type':'application/json'}});
  }
  getAllEmployeeType(){
    return this.httpClient.get<EmployeeType[]>('http://localhost:8080/api/employee/findAllEmployeeType')
  }
}
