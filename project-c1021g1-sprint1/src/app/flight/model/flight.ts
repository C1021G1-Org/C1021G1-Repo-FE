import {AirlineType} from "./airline";

export interface Flight {
  id? : number,
  codeFlight? : string,
  fromFlight? : string,
  toFlight? : string,
  dateStart? : string,
  dateEnd? : string,
  delFlagFlight? : boolean,
  airlineType? : AirlineType
}
