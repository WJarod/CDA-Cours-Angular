import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

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
