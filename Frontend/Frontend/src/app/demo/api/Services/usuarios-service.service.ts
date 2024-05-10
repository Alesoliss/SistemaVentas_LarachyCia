import { Injectable } from '@angular/core';
import {UsuariosViewModel,Fill} from '../Models/UsuariosViewModel';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {

  constructor(private http: HttpClient) { }
  Url = 'http://sistemalarach.somee.com/api/Usuario/Listado';
  getUsuarios (){
    return this.http.get<UsuariosViewModel[]>(this.Url);
  }
  private baseUrl = 'https://localhost:44300/api/Usuario';

 
  login(usuario: string, contraseña: string): Observable<any> {
    const url = `${this.baseUrl}/Login/${encodeURIComponent(usuario)},${encodeURIComponent(contraseña)}`;
    return this.http.get<any>(url);
  }



  
  insertarUsuario(formData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Insert/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }


  actualizarUsuario(categoria: UsuariosViewModel): Observable<any> {
    const url = `${this.baseUrl}/Update`;
    return this.http.put(url, categoria);
  }
  
  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`http://sistemalarach.somee.com/API/Municipios/Detalles?Munic_Id=${codigo}`);
  }



  getdetalles(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${ 'https://localhost:44300/api/Usuario/Detalles/' + codigo}`);
  }

  eliminarmetodo(categoriaId: number): Observable<any> {
    const url = `${this.baseUrl}/Delete/${categoriaId}`;
    return this.http.delete(url);
  }


}