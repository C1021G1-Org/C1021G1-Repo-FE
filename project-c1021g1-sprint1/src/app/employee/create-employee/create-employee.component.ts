import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../employee.service";
import {Employee} from "../model/employee";
import {EmployeeType} from "../model/employeeType";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employee: Employee;
  listEmployeeType: EmployeeType[] = [];
  createEmployeeForm : FormGroup = new FormGroup({
    id : new FormControl(''),
    name_Employee: new FormControl('',[Validators.required]),
    code_Employee: new FormControl(''),
    gender_Employee: new FormControl(''),
    birthday_Employee: new FormControl(''),
    phone_Employee: new FormControl(''),
    email_Employee: new FormControl(''),
    address_Employee: new FormControl(''),
    id_employee_type: new FormControl('')
  }
)
  constructor(private employeeService: EmployeeService , private router: Router) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployeeType().subscribe(data => {
      this.listEmployeeType = data;
    });
  }

  createEmployee(){
    console.log(this.createEmployeeForm.value)
    this.employeeService.createEmployee(this.createEmployeeForm.value).subscribe(()=>{
      this.router.navigateByUrl('/employee');
    }
    )
}
}

