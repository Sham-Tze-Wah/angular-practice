import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ContentModel} from './content.model';
import {CONTENT} from '../mock/mock-content';
import {ContentService} from './content.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { GenericModel } from '../shared/models/generic.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
//import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit{
  @ViewChild('modalCenter') modalCenter?: ElementRef;
  @ViewChild('addrTempModal') addrModal?: any;

  bankaccountlength: Number = 20;

  content: ContentModel = {};
  contents : ContentModel[] = CONTENT;

  countryList : GenericModel[] = [
    {id: '1', name:'Malaysia (MY)', code: 'MY'},
    {id: '2', name: 'Singapore (SG)', code: 'SG'},
    {id: '3', name: 'India (IND)', code:'IND'}
  ];

  citizenshipList : GenericModel[] = [
    {id: '1', name:'Local', code: 'LCL'},
    {id: '3', name: 'Other', code: 'OTH'}
  ]

  constructor(private contentService: ContentService, public dialog: MatDialog, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.contentService.getContent().subscribe((contents) => 
      this.contents = contents
      );
  }

  // openContent(): void{
  //   if(this.dialog.openDialogs.length==0){
  //     this.dialog.open(DialogFormComponent,{
  //       width: '250px',
  //       height: '',
  //       hasBackdrop: true,
  //       data: "right click",
  //       position: {top: '25vh', left: '25vw'},
  //     });
  //   }
  // }

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

  closeCustDialAndOpenAddrDial(event: any){
    if(this.modalCenter){
      console.log(this.modalCenter);
      this.modalCenter.nativeElement.click();
      console.log(this.addrModal);
      if(this.addrModal){
        console.log("Entered!");
        this.modalService.open(this.addrModal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
          console.log(`Closed with: ${result}`);
        }, (reason) => {
          console.log(`Dismissed ${reason}`);
        });
      }
    }
  }

  onChangeMxCountry(event: any) {
    console.log(event);
  }

  onChangeMxCitizenship(event: any) {
    console.log(event);
  }
}
