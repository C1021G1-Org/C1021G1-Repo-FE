import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ticket} from "./model/ticket";
import {Customer} from "../customer/model/customer";
import {Observable} from "rxjs";


const API_TICKET = "http://localhost:8080/api/ticket"
const SEAT_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) {}


  getAllTicket(index: number) {// Display List Ticket
    return this._http.get<any>(`${API_TICKET}` + '/page?page=' + index)
  }

  getAllTicketNotPagination(){
    return this._http.get<Ticket[]>(`${API_TICKET}` + 'list-not-pagination')
  }

  getTicketById(id) { // findById Ticket
    return this._http.get<any>(`${API_TICKET}/page/${id}`);
  }

  getDeleteTicket(idTicket) { // Delete Ticket
    // @ts-ignore
    return this._http.patch<any>(`${API_TICKET}/delete/${idTicket}`);
  }

  search(value: string, value2: string, index: number) {
    return this._http.get<Ticket[]>(`${API_TICKET}/search`+ '?option=' + value + '&keyword=' + value2 + '&page=' + index)
  }

}
