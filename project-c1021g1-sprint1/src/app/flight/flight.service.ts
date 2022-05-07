import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Airline} from "./model/airline";
import {Flight} from "./model/flight";
import {FlightDto} from "./dto/flight-dto";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  // TrongHD đường dẫn api
  private readonly FLIGHT_API='http://localhost:8080/api/flight/';


  constructor(private http : HttpClient) { }

  //TrongHD lấy list airline
  getAirlineType() {
    return this.http.get<Airline[]>(this.FLIGHT_API + 'listAirlineType')
  }

  //TrongHD lấy thông tin theo id
  getInfo(id : number) {
    return this.http.get<Flight>(this.FLIGHT_API + id)
  }

  //TrongHD thêm mới chuyến bay
  createFlight(flight) {
    const header = {'content-type': 'application/json'};
    const body = JSON.stringify(flight);
    return this.http.post<FlightDto>(this.FLIGHT_API + 'create', body, {headers: header});
  }

  //TrongHD sửa chuyến bay
  updateFlight(id: number, data) {
    return this.http.patch<FlightDto>(this.FLIGHT_API + 'update/' + id, data);
  }
}
