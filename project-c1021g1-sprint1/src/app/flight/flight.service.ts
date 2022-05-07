import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(
    private http: HttpClient
  ) { }
  private baseURL = 'http://localhost:8080/api/flight';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  getListAllFlight(index: number) {
    return this.http.get(this.baseURL + "/list?page=" + index);
  }

  getListAllFlightNotPagination() {
    return this.http.get(this.baseURL + "/list-not-pagination");
  }

  getListAllAirlineType() {
    return this.http.get(this.baseURL + "/listAirlineType");
  }

  search(fromFlight: string, toFlight: string, dateStart: string, dateEnd: string, index: any)  {
    return this.http.get(this.baseURL + '/search?fromFlight=' + fromFlight + '&toFlight='
                          + toFlight + '&dateStart=' + dateStart + '&dateEnd=' + dateEnd + '&page=' + index)
  }

  getFlightById(id: number){
    return this.http.get(this.baseURL + '/find-id/' + id);
  }

  deleteFlight(id) {
    return this.http.delete(this.baseURL + '/delete/' + id);
  }
}
