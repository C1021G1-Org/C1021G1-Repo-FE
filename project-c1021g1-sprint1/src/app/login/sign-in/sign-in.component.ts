import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../login.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ForgetedPasswordComponent} from "../forgeted-password/forgeted-password.component";
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  userForm: FormGroup;
  emailNotExist: boolean;
  checkPassword: boolean;
  checkRememberMe: boolean;
  email: string;
  roles: string[] = [];
  constructor(
                private loginService: LoginService,
    ) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    console.log(this.email);
    this.userForm = new FormGroup({
      email: new FormControl(this.email,Validators.email),
      password: new FormControl()
    })
  }

  signIn(){
    this.loginService.signIn(this.userForm.value).subscribe(data =>{
      this.roles  = [];
      let lengthRoles = data.roles.length;
      console.log(this.roles.toString());
      this.emailNotExist = false;
      this.checkPassword = false;
      for(let r = 0;r<lengthRoles;r++){
        this.roles.push(data.roles[r].authority)
      }
       sessionStorage.setItem('roles',this.roles.toString());
       sessionStorage.setItem('email',data.email);
       sessionStorage.setItem('token',data.token);
      if(this.checkRememberMe){
        localStorage.setItem('email',data.email);
      }else localStorage.setItem('email','');
      console.log(sessionStorage.getItem('email'));
    },error =>{
      console.log(error)
      if(error.error.includes('email')){
        this.emailNotExist = true;
        this.checkPassword = false;
      }else {
        this.emailNotExist = false;
        this.checkPassword = true;
      }
    })
  }

  remember(rememberE: HTMLInputElement) {
    if(rememberE.checked){
      this.checkRememberMe = true;
    }else {
      this.checkRememberMe = false;
    }
  }
}
