import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AirlineType} from "./model/airline";
import {Flight} from "./model/flight";
import {FlightDto} from "./dto/flight-dto";

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
  // Hieu
  getListAllFlight(index: number) {
    return this.http.get(this.baseURL + "/list?page=" + index);
  }
// Hieu
  getListAllFlightNotPagination() {
    return this.http.get(this.baseURL + "/list-not-pagination");
  }
// Hieu
  getListAllAirlineType() {
    return this.http.get(this.baseURL + "/listAirlineType");
  }
// Hieu
  search(fromFlight: string, toFlight: string, dateStart: string, dateEnd: string, index: any)  {
    return this.http.get(this.baseURL + '/search?fromFlight=' + fromFlight + '&toFlight='
                          + toFlight + '&dateStart=' + dateStart + '&dateEnd=' + dateEnd + '&page=' + index)
  }
// Hieu
  getFlightById(id: number){
    return this.http.get(this.baseURL + '/find-id/' + id);
  }
// Hieu
  deleteFlight(id) {
    return this.http.delete(this.baseURL + '/delete/' + id);
  }


  //TrongHD lấy list airline
  getAirlineType() {
    return this.http.get<AirlineType[]>(this.baseURL + '/listAirlineType')
  }

  //TrongHD lấy thông tin theo id
  getInfo(id : number) {
    return this.http.get<Flight>(this.baseURL + '/' +id)
  }

  //TrongHD thêm mới chuyến bay
  createFlight(flight) {
    const header = {'content-type': 'application/json'};
    const body = JSON.stringify(flight);
    return this.http.post<FlightDto>(this.baseURL + '/create', body, {headers: header});
  }

  //TrongHD sửa chuyến bay
  updateFlight(id: number, data) {
    return this.http.patch<FlightDto>(this.baseURL + '/update/' + id, data);
  }
}
