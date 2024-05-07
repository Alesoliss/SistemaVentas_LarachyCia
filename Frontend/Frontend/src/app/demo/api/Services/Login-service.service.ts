import { Injectable } from '@angular/core';
import {LoginVieweMOdel} from '../Models/LoginViewModel';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class ServiceService {
    constructor(private http:HttpClient) { }
   //  url = BASE_URL + 'API/Cargo/List'
 
 
   UrlLogin =  'https://localhost:44300/api/Usuario/Login/';
   login(loginData: LoginVieweMOdel): Observable<any> {
       return this.http.get<any>(`${this.UrlLogin}${loginData.usuario},${loginData.contra}`, {});
     }
 
   //  getLogin(){
   //    return this.http.get<Login[]>(this.url)
    }
 