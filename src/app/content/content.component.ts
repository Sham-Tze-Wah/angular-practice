import { Component, OnInit } from '@angular/core';
import {ContentModel} from './content.model';
import {CONTENT} from '../mock/mock-content';
import {ContentService} from './content.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { GenericModel } from '../shared/models/generic.model';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit{
  bankaccountlength: Number = 20;

  content: ContentModel = {};
  contents : ContentModel[] = CONTENT;
  countryList : GenericModel[] = [
    {id: '1', name:'Malaysia'},
    {id: '2', name: 'Singapore'},
    {id: '3', name: 'India'}
  ];

  constructor(private contentService: ContentService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.contentService.getContent().subscribe((contents) => 
      this.contents = contents
      );
  }

  openContent(): void{
    if(this.dialog.openDialogs.length==0){
      this.dialog.open(DialogFormComponent,{
        width: '250px',
        height: '',
        hasBackdrop: true,
        data: "right click",
        position: {top: '25vh', left: '25vw'},
      });
    }
  }

  onlyNumber(event: any){
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else {
      // If the number field already has . then don't allow to enter . again.
      if (event.target.value.search(/\./) > -1 && charCode == 46) {
        return false;
      }
      if (event.target.value.search(/\./) > -1 && (event.target.value + '').split('.')[1].length > 1) {
        return false;
      }
      return true;
    }
  }

  onPastenumeric(event: ClipboardEvent){
    let clipboardData = event.clipboardData;

    let pastedText = clipboardData!!.getData('text');
    let trimmedText = /^[0-9]*$/;

    if (trimmedText.test(pastedText)) {
    } else {
      // this.toastrService.error('Numeric value allowed', 'Error');
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onChangeMxCountry(event: any) {
    console.log(event);
  }
}
