import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FlightRoutingModule} from "./flight/flight-routing.module";




const routes: Routes = [
  {
    path: 'flight', loadChildren: () => import('./flight/flight.module').then(mod => mod.FlightModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),FlightRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
