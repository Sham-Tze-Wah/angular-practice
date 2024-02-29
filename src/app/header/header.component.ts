import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  activeColor = true;
  homeRoute = '/home-page';
  custInfoRoute = '/cust-info';
  dashboardRoute = '/dashboard-page';
  constructor(private router: Router) { }

  changeColor(){
    console.log('changing color');
    this.activeColor = !this.activeColor;
  }

  activeRoute(routename: string): boolean {
    return this.router.url.indexOf(routename) > -1;
  }
}
