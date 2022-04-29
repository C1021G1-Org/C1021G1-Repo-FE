import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../customer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ICustomerType} from "../model/ICustomerType";
import {ICountries} from "../model/ICountries";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  customerType: ICustomerType[];
  country: ICountries[];
  constructor(private customerService: CustomerService,
              private snackBar: MatSnackBar) {
  }

  customer = new FormGroup({
    nameCustomer: new FormControl(''),
    genderCustomer: new FormControl(''),
    birthdayCustomer: new FormControl(''),
    idCardCustomer: new FormControl(''),
    phoneCustomer: new FormControl(''),
    emailCustomer: new FormControl(''),
    addressCustomer: new FormControl(''),
    delFlagCustomer: new FormControl(''),
    countries: new FormControl(''),
    customerType: new FormControl('')
  });
  ngOnInit(): void {
    this.customerService.getAllCustomerType().subscribe(data => {
        this.customerType = data;
      }
    );
    this.customerService.getAllCountries().subscribe(data => {
        this.country = data;
      }
    );

  }

  save() {

  }
}
