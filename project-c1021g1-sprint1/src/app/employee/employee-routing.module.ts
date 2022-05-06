import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListEmployeeComponent} from "./list-employee/list-employee.component";
import {DeleteEmployeeComponent} from "./delete-employee/delete-employee.component";
import {CreateEmployeeComponent} from "./create-employee/create-employee.component";
import {EditEmployeeComponent} from "./edit-employee/edit-employee.component";


const routes: Routes = [
  {path: 'employee', component: ListEmployeeComponent},
  {path: 'employee/delete/:id', component: DeleteEmployeeComponent},
  {path: 'employee/create', component:CreateEmployeeComponent},
  {path: 'employee/edit/:id', component:EditEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
