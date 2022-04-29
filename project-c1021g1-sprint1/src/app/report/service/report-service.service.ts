import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  URL_REPORT = 'http://localhost:8080/report-price';
  URL_REPORT_EMPLOYEE = 'http://localhost:8080/report-employee';

  constructor(private  httpClient : HttpClient) { }

  getAllReport():Observable<any>{
    return this.httpClient.get(this.URL_REPORT);
  }

  getAllReportEmployee():Observable<any>{
    return this.httpClient.get(this.URL_REPORT_EMPLOYEE);
  }
}
