import { Injectable } from '@angular/core';
import {EstadosCivilesViewModel,Fill} from '../Models/EstadosCivilesViewModel';
import {HttpClient} from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { BASE_URL } from './urlsettings';

@Injectable({
  providedIn: 'root'
})
export class EstadosCivilesServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44300/API/EstadosCiviles/Listado';
  private baseUrl = 'http://sistemalarach.somee.com/API/EstadosCiviles';

  
  insertarCivil(formData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Create/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }


  actualizarCivil(categoria: EstadosCivilesViewModel): Observable<any> {
    const url = `${this.baseUrl}/Actualizar`;
    return this.http.put(url, categoria);
  }
  
  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'API/EstadosCiviles/Detalles/' + codigo}`);
  }



  getdetalles(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`https://localhost:44300/API/EstadosCiviles/Detalles?Estad_Id=${codigo}`);
  }

  eliminarCivil(categoriaId: number): Observable<any> {
    const url = `${this.baseUrl}/Eliminar/${categoriaId}`;
    return this.http.delete(url);
  }

  getEstado (){
    return this.http.get<EstadosCivilesViewModel[]>(this.Url);
  }
}