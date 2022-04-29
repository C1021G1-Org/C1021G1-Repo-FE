import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { EditCustomerByEmployeeComponent } from './edit-customer-by-employee/edit-customer-by-employee.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [CreateCustomerComponent, ListCustomerComponent, EditCustomerComponent, EditCustomerByEmployeeComponent, ViewCustomerComponent, DeleteCustomerComponent],
    exports: [
        CreateCustomerComponent,
        ListCustomerComponent
    ],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        ReactiveFormsModule
    ]
})
export class CustomerModule { }
