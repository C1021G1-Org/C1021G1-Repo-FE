import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-forgeted-password',
  templateUrl: './forgeted-password.component.html',
  styleUrls: ['./forgeted-password.component.css']
})
export class ForgetedPasswordComponent implements OnInit {
  formForgotPs: FormGroup;
  emailNotExist: boolean;
  checkPassword: any;
  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.formForgotPs = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    })
  }

  Update() {
    this.loginService.changPs(this.formForgotPs.value).subscribe(data => {
      console.log(data);
      console.log(12);
    },error => {
      console.log(error);
      console.log(55);
    })
  }
}
