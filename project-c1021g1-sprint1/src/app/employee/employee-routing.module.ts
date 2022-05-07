import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListEmployeeComponent} from "./list-employee/list-employee.component";
import {DeleteEmployeeComponent} from "./delete-employee/delete-employee.component";


const routes: Routes = [
  {path: 'employee', component: ListEmployeeComponent},
  {path: 'employee/delete/:id', component: DeleteEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
