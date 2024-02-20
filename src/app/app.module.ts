import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';

import { NgbModule, NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentComponent } from './content/content.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogFormComponent } from './dialog-form/dialog-form.component';

import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgSelectModule } from '@ng-select/ng-select';
import { OwlDateTimeModule, OWL_DATE_TIME_FORMATS} from '@danielmoncada/angular-datetime-picker';
import { OwlMomentDateTimeModule } from '@danielmoncada/angular-datetime-picker-moment-adapter';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_MOMENT_FORMATS = {
  parseInput: 'L HH:mm A',
  fullPickerInput: 'L HH:mm A',
  datePickerInput: 'L HH:mm A',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    ContentComponent,
    DialogFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    FontAwesomeModule,
    MatDialogModule,
    MatNativeDateModule,
    MatIconModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    FormsModule,
    MatFormFieldModule,
    NgSelectModule,
    OwlDateTimeModule,
    BrowserAnimationsModule,
    OwlMomentDateTimeModule
  ],
  providers: [{provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS}],
  bootstrap: [AppComponent]
})
export class AppModule { }
