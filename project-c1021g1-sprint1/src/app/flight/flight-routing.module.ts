import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateFlightComponent} from "./create-flight/create-flight.component";
import {EditFlightComponent} from "./edit-flight/edit-flight.component";


const routes: Routes = [
  //đường path của tronghd nha
  {
    path : 'create', component: CreateFlightComponent
  },
  {
    path : 'update/:id', component: EditFlightComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }
