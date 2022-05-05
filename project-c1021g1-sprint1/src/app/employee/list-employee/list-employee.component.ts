import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteEmployeeComponent} from "../delete-employee/delete-employee.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Employee} from "../model/employee";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  employees: Employee[] = [];
  employee: Employee;
  p: number = 1;
  totalEmployee: number;
  indexEmployee: number = 0;
  listEmployeeNotPagination: Employee[] = [];

  constructor(private employeeService: EmployeeService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    this.employeeService.getAllEmployee(0).subscribe(data => {
      this.employees = data['content'];
      this.totalEmployee = data['totalPages'] - 1;
    });

    this.employeeService.getAllEmployeeNotPagination().subscribe(data => {
      this.listEmployeeNotPagination = data['content'];
    })
  }

  dialogDeleteCustomer(id: number) {
    this.employeeService.findById(id).subscribe(data => {
      const x = this.dialog.open(DeleteEmployeeComponent, {
        width: '800px',
        data: {employee: data}
      })
      x.afterClosed().subscribe(() => {
        this.ngOnInit();
      }, error => {
      })
    })
  }

  firstPage(name: string, code: string, email: string) {
    this.indexEmployee = 0;
    this.search(name, code, email);
  }

  previousPage(name: string, code: string, email: string) {
    this.indexEmployee = this.indexEmployee - 1;
    if (this.indexEmployee < 0) {
      this.indexEmployee = 0;
      this.ngOnInit();
    } else {
      this.employeeService.search(name,code,email,this.indexEmployee).subscribe(data => {
        this.employees = data['content'];
      })
    }
  }

  nextPage(name: string, code: string, email: string) {
    this.indexEmployee = this.indexEmployee + 1;
    if (this.indexEmployee > this.totalEmployee) {
      this.indexEmployee = this.indexEmployee - 1;
    } else
      this.employeeService.search(name,code,email,this.indexEmployee).subscribe(data => {
        this.employees = data['content'];
      })
  }

  lastPage(name: string, code: string, email: string) {
    this.indexEmployee = this.totalEmployee;
    this.employeeService.search(name,code,email,this.totalEmployee).subscribe(data => {
      this.employees = data['content'];
    })
  }

  search(name: string, code: string, email: string, page = 0) {
    this.employeeService.search(name,code,email,page).subscribe(data => {
      this.employees = data['content'];
      this.indexEmployee = 0;
      this.totalEmployee = data['totalPages'] - 1;
      this.snackBar.open("Tìm kiếm thành công!",'', {
        duration: 2000
      })
    })
  }
}
