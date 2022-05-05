import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FooterComponent} from "./layout/footer/footer.component";
import {HeaderComponent} from "./layout/header/header.component";
import {TicketRoutingModule} from "./ticket/ticket-routing.module";
import {ListTicketComponent} from "./ticket/list-ticket/list-ticket.component";


const routes: Routes = [
  {path: "header", component: HeaderComponent},
  {path: "", component: ListTicketComponent},
  {path: "footer", component: FooterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), TicketRoutingModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }
