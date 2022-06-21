import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { ILogin } from './ILogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, ILogin {

  email: string = "";
  password: string = "";

  constructor(private router: Router, private user: User) { }

  ngOnInit(): void {
  }

  login(email: string, password: string): boolean {
    this.user = this.user.getUserByEmail(email);
    if (this.user.email == email && this.user.password == password) {
      localStorage.setItem('token', 'true');
      if(localStorage.getItem('token') == "true")
      {
        console.log("login")
        this.router.navigate(['/'])
      }
      return true;
    } else {
      return false;
    }
  }

  forceLogin(){
    localStorage.setItem('token', 'true');
      if(localStorage.getItem('token') == "true")
      {
        console.log("login")
        this.router.navigate(['/'])
      }
  }

}
