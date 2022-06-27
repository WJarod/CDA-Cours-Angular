import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  forceLogin(){
    localStorage.setItem('user-token', 'true');
      if(localStorage.getItem('user-token') == "true")
      {
        console.log("login")
        this.router.navigate(['/'])
      }
  }

}
