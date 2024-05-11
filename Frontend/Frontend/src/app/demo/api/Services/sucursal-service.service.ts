import { Injectable } from '@angular/core';
import {SucursalesViewModel,Fill} from '../Models/SucursalesViewModel';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { BASE_URL } from './urlsettings';

@Injectable({
  providedIn: 'root'
})
export class SucursalServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44300/API/Sucursales/Listado';
  private baseUrl = 'https://localhost:44300/API/Sucursales';
  getSucursal (){
    return this.http.get<SucursalesViewModel[]>(this.Url);
  }

  insertarUsuario(formData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Create/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }


  actualizarUsuario(categoria: SucursalesViewModel): Observable<any> {
    const url = `${this.baseUrl}/Actualizar`;
    return this.http.put(url, categoria);
  }
  
  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'API/Sucursales/Detalles/' + codigo}`);
  }


  getdetalles(codigo: number): Observable<Fill> {
    return this.http.get<Fill>(`https://localhost:44300/API/Sucursales/Detalles?Categ_Id=${codigo}`);
  }

  eliminarmetodo(categoriaId: number): Observable<any> {
    const url = `${this.baseUrl}/Eliminars/${categoriaId}`;
    return this.http.delete(url);
  }



}