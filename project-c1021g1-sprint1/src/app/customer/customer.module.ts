import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { EditCustomerByEmployeeComponent } from './edit-customer-by-employee/edit-customer-by-employee.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';


@NgModule({
    declarations: [CreateCustomerComponent, ListCustomerComponent, EditCustomerComponent, EditCustomerByEmployeeComponent, ViewCustomerComponent, DeleteCustomerComponent],
  exports: [
    ListCustomerComponent,
    CreateCustomerComponent
  ],
    imports: [
        CommonModule,
        CustomerRoutingModule
    ]
})
export class CustomerModule { }
