import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditTicketComponent} from "./edit-ticket/edit-ticket.component";
import {PrintTicketComponent} from "./print-ticket/print-ticket.component";


const routes: Routes = [
  {
    path: "editTicket/:id" ,
    component : EditTicketComponent
  },
  {
    path: "printTicket/:id" ,
    component : PrintTicketComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
