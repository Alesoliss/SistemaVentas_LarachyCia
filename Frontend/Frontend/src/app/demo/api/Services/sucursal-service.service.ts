import { Injectable } from '@angular/core';
import {SucursalesViewModel} from '../Models/SucursalesViewModel';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SucursalServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44300/API/Sucursales/Listado';

  getSucursal (){
    return this.http.get<SucursalesViewModel[]>(this.Url);
  }
}