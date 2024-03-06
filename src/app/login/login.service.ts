import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpService: HttpClient) { }

  onLogin(obj: any){
    return this.httpService.post('',obj);
  }
}
