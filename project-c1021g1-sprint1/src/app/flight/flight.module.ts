import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightRoutingModule } from './flight-routing.module';
import { CreateFlightComponent } from './create-flight/create-flight.component';
import { EditFlightComponent } from './edit-flight/edit-flight.component';
import { DeleteFlightComponent } from './delete-flight/delete-flight.component';
import { ListFlightComponent } from './list-flight/list-flight.component';
import { ListSearchFlightComponent } from './list-search-flight/list-search-flight.component';


@NgModule({
  declarations: [CreateFlightComponent, EditFlightComponent, DeleteFlightComponent, ListFlightComponent, ListSearchFlightComponent],
  imports: [
    CommonModule,
    FlightRoutingModule
  ]
})
export class FlightModule { }
