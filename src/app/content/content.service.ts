import { Injectable } from '@angular/core';
import { CONTENT } from '../mock/mock-content';
import { ContentModel } from './content.model';
import {Observable, of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor() { }

  getContent() : Observable<ContentModel[]> {
    const contents = of(CONTENT);
    return contents;
  }
}
