import { Injectable } from '@angular/core';
import {EstadosCivilesViewModel,Fill} from '../Models/EstadosCivilesViewModel';
import {HttpClient} from '@angular/common/http';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadosCivilesServiceService {

  constructor(private http: HttpClient) { }
  Url = 'http://sistemalarach.somee.com/API/EstadosCiviles/Listado';
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
  
  getDetalles(codigo: number): Observable<Fill> {
    return this.http.get<Fill>(`${'http://sistemalarach.somee.com/API/EstadosCiviles/Detalles/' + codigo}`);
  }

  eliminarCivil(categoriaId: number): Observable<any> {
    const url = `${this.baseUrl}/Eliminar/${categoriaId}`;
    return this.http.delete(url);
  }

  getEstado (){
    return this.http.get<EstadosCivilesViewModel[]>(this.Url);
  }
}