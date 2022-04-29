import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  URL_REPORT = 'http://localhost:8080/report-price';
  URL_REPORT_EMPLOYEE = 'http://localhost:8080/report-employee';

  constructor(private  httpClient: HttpClient) {
  }


  getAllReport(): Observable<any> {
    return this.httpClient.get<any>(this.URL_REPORT);
  }

  getAllReportEmployee(): Observable<any> {
    return this.httpClient.get<any>(this.URL_REPORT_EMPLOYEE);
  }
}
