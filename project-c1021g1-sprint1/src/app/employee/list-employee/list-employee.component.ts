import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../employee.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteEmployeeComponent} from "../delete-employee/delete-employee.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  employees: any = [];
  employee: any;
  p: number = 1;

  constructor(private employeeService: EmployeeService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployee(0).subscribe(data => {
      this.employees = data['content'];
    });
  }

  dialogDeleteCustomer(id: number) {
    this.employeeService.findById(id).subscribe(data => {
      const x = this.dialog.open(DeleteEmployeeComponent, {
        width: '500px',
        data: {employee: data['content']}
      })
      // x.afterClosed().subscribe(()=>{
      //   this.ngOnInit();
      //   this.snackBar.open("Xoá thành công!",'',{
      //     duration: 2000
      //   })
      // })
    })
  }
}
