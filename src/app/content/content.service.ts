import { Injectable } from '@angular/core';
import { CONTENT } from '../mock/mock-content';
import { ContentModel } from './content.model';
import {Observable, of} from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private sanitizer: DomSanitizer, private spinner: NgxSpinnerService) {}

  getContent() : Observable<ContentModel[]> {
    const contents = of(CONTENT);
    return contents;
  }
}
