import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TicketRoutingModule} from "./ticket/ticket-routing.module";
import {TicketModule} from "./ticket/ticket.module";

import {EmployeeRoutingModule} from "./employee/employee-routing.module";


const routes: Routes = [
  { path: 'employee',
    loadChildren: () => import ('./employee/employee.module').then(module => module.EmployeeModule)
  },
  { path: 'ticket',
    loadChildren: () => import ('./ticket/ticket.module').then(module => module.TicketModule)
  },
  {
    path: "news", loadChildren: () => import('./news/news.module').then(mod => mod.NewsModule)
  },
  { path: 'employee',
    loadChildren: () => import ('./employee/employee.module').then(module => module.EmployeeModule)
  }
];




// const routes: Routes = [  {
//   path: 'news',
//   loadChildren: () => import('./news/news.module').then(module => module.NewsModule)
// },];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    EmployeeRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
