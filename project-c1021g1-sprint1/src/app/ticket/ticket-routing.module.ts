import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListHistoryTicketComponent} from "./list-history-ticket/list-history-ticket.component";
import {PaymentTicketComponent} from "./payment-ticket/payment-ticket.component";


const routes: Routes = [
  {path:"ticket",pathMatch:"full",redirectTo:"historyPayment"},
  {path:"historyPayment",component:ListHistoryTicketComponent},
  {path:"paymentTicket",component:PaymentTicketComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
