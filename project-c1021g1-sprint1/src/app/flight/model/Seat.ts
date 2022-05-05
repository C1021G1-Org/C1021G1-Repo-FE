import {Flight} from "./flight";
import {SeatType} from "./SeatType";

export interface Seat {
  id: number;

  codeSeat: string;

  positionSeat: number;

  statusSeat: boolean;

  delFlagSeat: boolean;

  seatType: SeatType;

  flightSeat: Flight;



}
