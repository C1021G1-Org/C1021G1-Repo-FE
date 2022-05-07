import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListFlightComponent} from "./list-flight/list-flight.component";



const routes: Routes = [
  {
    path:'flight', component: ListFlightComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }
