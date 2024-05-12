import { Injectable } from '@angular/core';
import {UsuariosViewModel} from '../Models/UsuariosViewModel';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class ServiceService {
    constructor(private http:HttpClient) { }
   //  url = BASE_URL + 'API/Cargo/List'
 
 
   UrlLogin =  'http://sistemalarach.somee.com/api/Usuario/Login/';
   login(loginData: UsuariosViewModel): Observable<any> {
       return this.http.get<any>(`${this.UrlLogin}${loginData.usuar_Usuario},${loginData.usuar_Contrasena}`, {});
     }
 
   //  getLogin(){
   //    return this.http.get<Login[]>(this.url)
    }
 