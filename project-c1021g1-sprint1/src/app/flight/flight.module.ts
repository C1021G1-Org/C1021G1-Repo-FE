import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightRoutingModule } from './flight-routing.module';
import { CreateFlightComponent } from './create-flight/create-flight.component';
import { EditFlightComponent } from './edit-flight/edit-flight.component';
import { DeleteFlightComponent } from './delete-flight/delete-flight.component';
import { ListFlightComponent } from './list-flight/list-flight.component';
import { ListSearchFlightComponent } from './list-search-flight/list-search-flight.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
  declarations: [CreateFlightComponent, EditFlightComponent, DeleteFlightComponent, ListFlightComponent, ListSearchFlightComponent],
  exports: [
    EditFlightComponent,
    CreateFlightComponent
  ],
  imports: [
    CommonModule,
    FlightRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class FlightModule { }
