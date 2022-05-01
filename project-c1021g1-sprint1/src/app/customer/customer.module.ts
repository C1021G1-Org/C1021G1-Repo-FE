import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CustomerRoutingModule} from './customer-routing.module';
import {CreateCustomerComponent} from './create-customer/create-customer.component';
import {ListCustomerComponent} from './list-customer/list-customer.component';
import {EditCustomerComponent} from './edit-customer/edit-customer.component';
import {EditCustomerByEmployeeComponent} from './edit-customer-by-employee/edit-customer-by-employee.component';
import {ViewCustomerComponent} from './view-customer/view-customer.component';
import {DeleteCustomerComponent} from './delete-customer/delete-customer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatButtonToggleModule} from "@angular/material/button-toggle";


@NgModule({
  declarations: [CreateCustomerComponent, ListCustomerComponent, EditCustomerComponent, EditCustomerByEmployeeComponent, ViewCustomerComponent, DeleteCustomerComponent],
  exports: [
    CreateCustomerComponent,
    ListCustomerComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatButtonToggleModule,
  ]
})
export class CustomerModule {
}
