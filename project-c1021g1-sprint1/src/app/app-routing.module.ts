import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListCustomerComponent} from "./customer/list-customer/list-customer.component";
import {DeleteCustomerComponent} from "./customer/delete-customer/delete-customer.component";
import {CustomerRoutingModule} from "./customer/customer-routing.module";


const routes: Routes = [
  {path: 'customer',
      loadChildren: () => import('./customer/customer.module').then(module => module.CustomerModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CustomerRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
