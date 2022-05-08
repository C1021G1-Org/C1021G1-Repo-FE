import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ITicket} from "./model/ticket/i-ticket";
import {IEditTicket} from "./model/ticket/i-edit-ticket";


@Injectable({
  providedIn: 'root'
})
export class TicketService {

private API_URL_BE = "http://localhost:8080/api/ticket";

  constructor(private http : HttpClient) { }

  getTicketById(id: number){
      return this.http.get<ITicket>(this.API_URL_BE + '/findTicket/' + id)
  }

  editTicketById(id: number, data){
      return this.http.patch<ITicket>(this.API_URL_BE + '/editTicket/' + id, data)
  }
}
