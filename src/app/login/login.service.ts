import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private basePath = `/account/api`;

  constructor(private httpService: HttpClient) { }

  onLogin(obj: any){
    console.log(obj);
    return this.httpService.post(`${this.basePath}/login`,obj);
  }
}
