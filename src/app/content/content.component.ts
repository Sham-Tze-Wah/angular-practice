import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {ContentModel} from './content.model';
import {CONTENT} from '../mock/mock-content';
import {ContentService} from './content.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { GenericModel } from '../shared/models/generic.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import{ NgForm, NgModel } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { default as swal } from 'sweetalert2';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit, AfterViewInit{
  @Input() modalId? : string;
  @Input() ntnChkboxErrorMsg : boolean = false; //control all the mandatory checkbox not to show first time when load the page
  // private modalElement : any;
  @ViewChild('modalCenter') modalCenter?: ElementRef;
  @ViewChild('addrModal') addrModal?: ElementRef;
  @ViewChild('dtLeave', {static: true}) dtLeave?: ElementRef;
  // @ViewChild('custInfoForm', { static: false }) contactForm: NgForm;

  bankaccountlength: Number = 20;
  closeResult: string = "Close Result";
  maxDate = moment().add(1,'minute').toDate();
  minDate = moment().subtract(150, 'years').toDate();
  attachments?: any[] = [];
  files: File[] = [];

  content: ContentModel = {};
  contents : any[] = [];

  countryList : GenericModel[] = [
    {id: '1', name:'Malaysia', code: 'MY', isChecked: false},
    {id: '2', name: 'Singapore', code: 'SG', isChecked: false},
    {id: '3', name: 'India', code:'IND', isChecked: false}
  ];

  citizenshipList : GenericModel[] = [
    {id: '1', name:'Local', code: 'LCL'},
    {id: '3', name: 'Other', code: 'OTH'}
  ]

  constructor(
    private contentService: ContentService, 
    public dialog: MatDialog, 
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
    ) {
    
   }

  ngOnInit(): void {
    this.spinner.show();
    this.getCustInfo();
    this.content.mxCitizen = 'LCL';
    // console.log(this.ntnChkboxErrorMsg);
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }

  getCountryList(){
    this.countryList
  }

  ngAfterViewInit(): void {
    //this.checkboxErrorMsg = false;
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

  /* User Interface Function & CSS Manipulation */

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

  addAnimation(event: any, classListStr: string[]): void{
    // console.log(event);
    if(event.target.children[0].classList !== undefined){
      event.target.children[0].classList.add(classListStr);
    }
  }

  removeAnimation(event: any, classListStr: string[]): void{
    // console.log(event.target);
    if(event.target.children[0].classList !== undefined){
      event.target.children[0].classList.remove(classListStr);
    }
  }

  /* User Function & Error Handling */

  onUploadSuccess(event: any){
    console.log(event);
    if(event.rejectedFiles.length > 0){
      this.toastrService.error('Please check the uploaded file. It is rejected.', 'Error');
    }
    if(this.files.length + event.addedFiles.length > 2){
      this.toastrService.error('Maximum 3 files allowed', 'Error');
    }
    else{
      this.files.push(...event.addedFiles);
    }
  }

  onRemove(event: any){
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
 

  // openDialog(modalStr: string) {
  //   console.log(modalStr);
  //   this.modalService.dismissAll();
  //   if(modalStr === 'modalCenter'){
  //     if(this.modalCenter){
  //       this.modalCenter.nativeElement.style.display = 'block';
  //       this.modalCenter.nativeElement.classList.add('modal-open');
  //       this.modalCenter.nativeElement.classList.add('show');
  //     }
  //     else{
  //       console.log("Empty modalCenter: " + modalStr);
  //     }
  //   }
  //   else if(modalStr === 'addrModal'){
  //     if(this.addrModal){
  //       this.addrModal.nativeElement.style.display = 'block';
  //       this.addrModal.nativeElement.classList.add('modal-open');
  //       this.addrModal.nativeElement.classList.add('show');
  //     }
  //     else{
  //       console.log("Empty modalCenter: " + modalStr);
  //     }
  //   }
  // }
  openDialog(modal : any){
    this.modalService.dismissAll();
    this.modalService.open(modal, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      backdropClass: 'backdrop-class-z-index',
    }
    ).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  // closeCustDialAndOpenAddrDial(event: any){
  //   if(this.modalCenter){
  //     this.modalCenter.nativeElement.style.display = 'none';
  //     this.modalCenter.nativeElement.classList.remove('modal-open');
  //     this.modalCenter.nativeElement.classList.remove('show');
  //     if(this.addrModal){
  //       this.addrModal.nativeElement.style.display = 'block';
  //       // this.addrModal.nativeElement.classList.add('modal-open');
  //     }
  //   }
  // }
  closeModal(modal : any){
    this.modalService.dismissAll();
    this.toastrService.info('The modal is closed.', 'info');
  }

  closeAddrDial(event: any){
    // console.log(event);
  }

  onChangeMxCountry(event: any) {
    // console.log(event);
  }

  onChangeMxCitizenship(event: any) {
    // console.log(event);
  }

  // nationality: string[] = [];
  onChangeNationality(event: any){
    if(event.target.checked){
      this.countryList.find(selectedCountry => selectedCountry.name!! === event.target.value)!!.isChecked = true;
      this.ntnChkboxErrorMsg = false;
    }
    else{
      this.countryList.find(selectedCountry => selectedCountry.name!! === event.target.value)!!.isChecked = false;
      if(!this.globalAtLeastOneChecked()){
        this.ntnChkboxErrorMsg = true;
      }
    } 
  }

  globalIfChecked(nationality: string | undefined) : Boolean{
    return this.countryList.find(selectedCountry => selectedCountry.name!! === nationality)?.isChecked!!;
  }

  globalAtLeastOneChecked(){
    for(let country of this.countryList){
      if(country.isChecked){
        return true;
      }
    }
    return false;
  }

  /* API Invocation */

  onSubmit(content: any){
    
  }

  onChangeDob(event: any){
    console.log(this.dtLeave);
  }

  getCustInfo(){
    let index = 0;
    this.contents = [];
    this.contentService.getContent().subscribe(
      (result: any) => {
        console.log(result);
        for(let element of result){
          let current: ContentModel = {};
          current.mxName = element.mxName;
          current.mxIdNo = element.mxIdNo;
          current.mxHandPhoneNo = element.mxHandPhoneNo;
          current.mxEmail = element.mxEmail;
          current.mxLoginId = element.mxLoginId;
          current.mxAccountId = element.mxAccountId;
          current.extendedInfo = element.extendedInfo;
          current.mxNationality = element.mxNationality;
          current.mxAddress = element.mxAddress;
          current.mxAddress2 = element.mxAddress2;
          current.mxAddress3 = element.mxAddress3;
          current.mxAddress4 = element.mxAddress4;
          current.mxCity = element.mxCity;
          current.mxPostcode = element.mxPostcode;
          current.mxState = element.mxState;
          current.mxCountry = element.mxCountry;
          current.mxCitizen = element.mxCitizen;
          current.dateOfBirth = element.dateOfBirth;
          current.joinedDate = element.joinedDate;
          current.leaveDate = element.leaveDate;
          this.contents.push(current);
        }
      });
      console.log(this.contents);
  }

  saveCustInfo(){
    this.content.mxNationality = this.countryList.map(selectedCountry => {
      if(selectedCountry.isChecked){
        return selectedCountry.name + ',';
      }
      return '';
    })?.join('');
    
    this.content.mxNationality = this.content.mxNationality.lastIndexOf(',') > -1 ? this.content.mxNationality.replace(/,$/, '') : this.content.mxNationality;
    
    this.contentService.postContent(this.content).subscribe(
      (result) => {
        this.ngOnInit();
      });
    this.modalService.dismissAll();

    swal.fire(
      'Success',
      `Customer Info added successfully!!`,
      'success'
    );
    
  }

  closeBeforeSubmission(addrModal : any){
    swal
      .fire({
        title: 'Are you sure?',
        html: `Please confirm to exit now. <strong class="text-warning"> Your data will not be saved.</strong>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      })
      .then((result: any) => {
        if (result.value) {
          this.spinner.show();
          this.modalService.dismissAll();
          this.spinner.hide();
        } else if (result.dismiss === swal.DismissReason.cancel) {
          console.log('Cancelled the dialog');
        }
      });
  }

  deleteCustInfo(){
    console.log("Soft Delete Customer Info");
  }
}
