import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  activeColor = true;

  changeColor(){
    console.log('changing color');
    this.activeColor = !this.activeColor;
  }
}
