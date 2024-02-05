import { Component, OnInit } from '@angular/core';
import {ContentModel} from './content.model';
import {CONTENT} from '../mock/mock-content';
import {ContentService} from './content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit{

  contents : ContentModel[] = CONTENT;
  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.contentService.getContent().subscribe((contents) => 
      this.contents = contents
      );
  }
}
