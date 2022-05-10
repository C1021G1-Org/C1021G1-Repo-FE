export interface Flight {
  id: number;
  codeFlight: string;
  fromFlight: string;
  toFlight: string;
  dateStart: string;
  dateEnd: string;
  delFlagFlight: boolean;
  airlineType: AirlineType
}

export interface AirlineType {
  id: number;
  nameFlight: string;
  priceFlight: string;
  imageAirline: string;
  delFlagAirline: boolean;
}

export interface Seat {
  id: number;
  codeSeat: string;
  statusSeat: Boolean;
  delFlagSeat: Boolean;
  delFlagAirline: boolean;
  seatType:SeatType;
  flightSeat:Flight;
}
export interface SeatType {
  id: number;
  nameSeatType: string;
  priceSeatType: number;
}
export interface SeatType {
  id: number;
  nameSeatType: string;
  priceSeatType: number;
}

