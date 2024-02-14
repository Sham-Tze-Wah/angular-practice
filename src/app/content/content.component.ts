import { Component, OnInit } from '@angular/core';
import {ContentModel} from './content.model';
import {CONTENT} from '../mock/mock-content';
import {ContentService} from './content.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit{

  contents : ContentModel[] = CONTENT;
  constructor(private contentService: ContentService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.contentService.getContent().subscribe((contents) => 
      this.contents = contents
      );
  }

  openContent(): void{
    this.dialog.open(DialogFormComponent,{
      width: 'auto',
      height: 'auto',
      data: "right click"
    });
  }
}
