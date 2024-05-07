import { Injectable } from '@angular/core';
import {UsuariosViewModel} from '../Models/UsuariosViewModel';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44300/api/Usuario/Listado';
  getUsuarios (){
    return this.http.get<UsuariosViewModel[]>(this.Url);
  }
  private baseUrl = 'https://localhost:44300/api/Usuario';

 
  login(usuario: string, contraseña: string): Observable<any> {
    const url = `${this.baseUrl}/Login/${encodeURIComponent(usuario)},${encodeURIComponent(contraseña)}`;
    return this.http.get<any>(url);
  }

}