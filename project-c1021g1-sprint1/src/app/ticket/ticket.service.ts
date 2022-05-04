import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_TICKET = "http://localhost:8080/api/ticket/"

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) {
  }

  getAllTicketByCustomerId(id: number): Observable<any> {
    return this.http.get<any>(API_TICKET + "list/" + id);
  }

  getHistoryTicketByCustomerId(id: number): Observable<any> {
    return this.http.get<any>(API_TICKET + "listHistory/" + id);
  }

  payTicket(code: any): Observable<any> {
    // @ts-ignore
    return this.http.patch<any>(API_TICKET + "pay/" + code);
  }

  payTickets(code: any): Observable<any> {
    // @ts-ignore
    return this.http.patch<any>(API_TICKET + "pays/" + code);
  }

  getTotalPrice(code: any): Observable<any> {
    // @ts-ignore
    return this.http.get<any>(API_TICKET + "getPrice/" + code);
  }

  abortTicket(code: string): Observable<any> {
    // @ts-ignore
    return this.http.patch<any>(API_TICKET + "abort/" + code);
  }

  getTicketInfo(code: string): Observable<any> {
    return this.http.get<any>(API_TICKET + code)
  }

  confirmEmailPayment(finalPrice: number, nameCustomer: string, quantity: number): Observable<any> {
    // @ts-ignore
    return this.http.put<any>(API_TICKET + "sendmail" + "?finalPrice=" + finalPrice + "&nameCustomer=" + nameCustomer + "&quantity=" + quantity);
  }
}
