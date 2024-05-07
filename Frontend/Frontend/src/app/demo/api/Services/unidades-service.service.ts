import { Injectable } from '@angular/core';
import {UnidadesViewModel,Fill} from '../Models/UnidadesViewModel';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnidadServiceService {

  constructor(private http: HttpClient) { }
  Url = 'http://sistemalarach.somee.com/API/Unidades/Listado';
  private baseUrl = 'http://sistemalarach.somee.com/API/Unidades';

  
  insertarmetodo(formData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Create/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }


  actualizarmetodo(categoria: UnidadesViewModel): Observable<any> {
    const url = `${this.baseUrl}/Actualizar`;
    return this.http.put(url, categoria);
  }
  
  getDetalles(codigo: number): Observable<Fill> {
    return this.http.get<Fill>(`${'http://sistemalarach.somee.com/API/Unidades/Detalles/' + codigo}`);
  }

  eliminarmetodo(categoriaId: number): Observable<any> {
    const url = `${this.baseUrl}/Eliminar/${categoriaId}`;
    return this.http.delete(url);
  }
  getUnidades (){
    return this.http.get<UnidadesViewModel[]>(this.Url);
  }
}