import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  deconexion(): void {
    localStorage.setItem('token', 'false');
    if(localStorage.getItem('token') == "false")
    {
      console.log("deconexion")
      this.router.navigate(['/login'])
    }
  }

}
