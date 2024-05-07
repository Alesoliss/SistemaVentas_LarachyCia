import { Injectable } from '@angular/core';
import {RolesViewModel} from '../Models/RolesViewModel';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RolServiceService {

  constructor(private http: HttpClient) { }
  Url = 'http://sistemalarach.somee.com/API/Rol/Listado';

  getRoles (){
    return this.http.get<RolesViewModel[]>(this.Url);
  }
}