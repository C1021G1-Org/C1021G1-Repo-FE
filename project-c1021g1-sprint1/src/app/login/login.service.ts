import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SignInResult} from "./model/sign-in-result";
import {Country} from "./model/country";
import {ForgotPs} from "./model/forgot-ps";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  URL_SIGNUP = "http://localhost:8080/api/signUp";
  URL_SIGNIN = "http://localhost:8080/api/signIn";
  URL_COUNTRY = "http://localhost:8080/country/api/v1";
  URL_CHANGING_PS = "http://localhost:8080/api/forgetPassword";
  constructor(private httpclient: HttpClient) {
  }
  signUp(signUpForm:any){
    const header = { 'content-type': 'application/json'};
    signUpForm.country = {"id":1,"country":"VN"};
    const body = JSON.stringify(signUpForm);
    return this.httpclient.post(this.URL_SIGNUP,body,{headers:header})
  }
  signIn(user:SignInResult){
    const header = {'content-type': 'application/json'};
    const body = JSON.stringify(user);
    return this.httpclient.post<SignInResult>(this.URL_SIGNIN,body,{headers: header});
  }
  getCountryList(){
    return this.httpclient.get<Country[]>(this.URL_COUNTRY);
  }

  changPs(formForgotPs: ForgotPs) {
    const token = sessionStorage.getItem('token');
    const header = {
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`
    };
    const body = JSON.stringify(formForgotPs);
    console.log(body);
    return this.httpclient.post(this.URL_CHANGING_PS,body,{headers:header});
  }
}
