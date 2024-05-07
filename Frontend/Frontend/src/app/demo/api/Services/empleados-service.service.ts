import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { EmpleadoViewModel } from '../Models/EmpleadosViewModel';


@Injectable({
  providedIn: 'root'
})
export class EmpleadosServiceService {

  constructor(private http: HttpClient) { }
  Url = 'http://sistemalarach.somee.com/API/Empleados/Listado';

  getCargo (){
    return this.http.get<EmpleadoViewModel[]>(this.Url);
  }
}