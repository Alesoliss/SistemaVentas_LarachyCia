import { Injectable } from '@angular/core';
import {ProveedoresViewModel} from '../Models/ProveedoresViewModel';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProveedoresServiceService {

  constructor(private http: HttpClient) { }
  Url = 'http://sistemalarach.somee.com/API/Proveedores/Listado';

  getProveedor (){
    return this.http.get<ProveedoresViewModel[]>(this.Url);
  }
}