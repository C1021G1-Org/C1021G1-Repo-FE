import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TicketRoutingModule} from "./ticket/ticket-routing.module";
import {TicketModule} from "./ticket/ticket.module";


const routes: Routes = [
  { path: 'employee',
    loadChildren: () => import ('./employee/employee.module').then(module => module.EmployeeModule)
  },
  { path: 'ticket',
    loadChildren: () => import ('./ticket/ticket.module').then(module => module.TicketModule)
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
