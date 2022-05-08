import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ICustomer} from "../model/ICustomer";

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
  customer : ICustomer;
  constructor(private customerServie : CustomerService,
              private activeRouter : ActivatedRoute,
              private router : Router
  ) { }
  ngOnInit(): void {
    this.customerServie.findPersonalId(Number((this.activeRouter.snapshot.paramMap.get('id')))).subscribe((data: ICustomer) => {
      this.customer = data
    });
  }
}
