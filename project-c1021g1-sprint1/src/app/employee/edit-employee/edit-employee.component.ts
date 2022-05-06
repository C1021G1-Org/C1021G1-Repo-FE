import { Component, OnInit } from '@angular/core';
import {EmployeeType} from "../model/employeeType";
import {EmployeeService} from "../employee.service";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  id: number;
  listEmployeeType : EmployeeType[];
  constructor( private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployeeType().subscribe(data => {
      this.listEmployeeType = data;
    });
  }
  findEmployeeById(){
    this.employeeService.findById(this.id)
  }
}
