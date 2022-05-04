import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly employeeURL = 'http://localhost:8080/employee'

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
}
