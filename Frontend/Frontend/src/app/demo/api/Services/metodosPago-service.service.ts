import { Injectable } from '@angular/core';
import {MetodosPagoViewModel,Fill} from '../Models/MetodosPagoViewModel';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetodopagoServiceService {

  constructor(private http: HttpClient) { }
  Url = 'http://sistemalarach.somee.com/API/MetodosPago/Listado';
  private baseUrl = 'http://sistemalarach.somee.com/API/MetodosPago';

  
  insertarmetodo(formData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Create/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }


  actualizarmetodo(categoria: MetodosPagoViewModel): Observable<any> {
    const url = `${this.baseUrl}/Actualizar`;
    return this.http.put(url, categoria);
  }
  
  getDetalles(codigo: number): Observable<Fill> {
    return this.http.get<Fill>(`${'http://sistemalarach.somee.com/API/MetodosPago/Detalles/' + codigo}`);
  }

  eliminarmetodo(categoriaId: number): Observable<any> {
    const url = `${this.baseUrl}/Eliminar/${categoriaId}`;
    return this.http.delete(url);
  }
  getMetodoPago (){
    return this.http.get<MetodosPagoViewModel[]>(this.Url);
  }
  
}