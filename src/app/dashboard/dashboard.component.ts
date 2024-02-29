import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  @ViewChild('dashboard') dashboard?: ElementRef;

  constructor() {}

  ngOnInit() {
    
  }


}
