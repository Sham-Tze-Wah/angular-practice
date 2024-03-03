import { Injectable } from '@angular/core';
import { CONTENT } from '../mock/mock-content';
import { ContentModel } from './content.model';
import {Observable, of} from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { default as swal } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private baseURL = `http://localhost:9006/ecommerce`;

  constructor(private sanitizer: DomSanitizer, private spinner: NgxSpinnerService, 
    private http: HttpClient
    ) {}

  getContent() : Observable<any> {
    const contents = of(CONTENT);
    return contents;
    // return this.http.get(`${this.baseURL}/getAll`)
  }

  postContent(content: ContentModel): Observable<any> {
    // console.log(content);
    return this.http.post(`/ecommerce/api/test/customerInfo`, content);
    
  }
}
