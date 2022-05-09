import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerRoutingModule} from "./customer/customer-routing.module";


const routes: Routes = [
  // {
  //   path: 'customer',
  //   loadChildren: () => import('./customer/customer.module').then(module => module.CustomerModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CustomerRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
