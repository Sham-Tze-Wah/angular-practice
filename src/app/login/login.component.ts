import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username?: string
  email?: string;
  password?: string;
  message?: string;
  homeRoute = '/home-page';

  signUpUsers: any[] = [];
  signUpObj: any = {
    username : '',
    email: '',
    password: ''
  };
  loginObj: any = {
    username : '',
    password: ''
  };

  constructor(private loginService: LoginService) { }

  //https://www.youtube.com/watch?v=BSU3bIXU85k
  onSignUp(){
    this.signUpUsers.push(this.signUpObj);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signUpUsers));
    this.signUpObj = {
      username : '',
      email: '',
      password: ''
    };
  }

  onLogin(){
    const isUserExist = this.signUpUsers.find(m => m.username == this.loginObj.username)
    if(isUserExist != undefined){
      alert('User Login Successfully!');
    } else{
      alert('Wrong credentials!');
    }

    this.loginService.onLogin(this.loginObj).subscribe((res: any) => {
      console.log('res: ',res);
      localStorage.setItem('token', res.token);
    })
  }
}
