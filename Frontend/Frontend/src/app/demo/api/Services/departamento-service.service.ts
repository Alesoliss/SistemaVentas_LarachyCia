import { Injectable } from '@angular/core';
import {DepartamentosViewModel,Fill} from '../Models/DepartamentosViewModel';
import {HttpClient} from '@angular/common/http';
import { Observable,map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DepartamentoServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44300/API/Departamento/Listado';
  private baseUrl = 'https://localhost:44300/API/Departamento';

  
  insertardepartamento(formData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Create/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }


  actualizardepartamento(categoria: DepartamentosViewModel): Observable<any> {
    const url = `${this.baseUrl}/Actualizar`;
    return this.http.put(url, categoria);
  }
  
  getDetalles(codigo: number): Observable<Fill> {
    return this.http.get<Fill>(`${'https://localhost:44300/API/Departamento/Detalles/' + codigo}`);
  }

  eliminardepartamento(departamentoId: number): Observable<any> {
    const url = `${this.baseUrl}/Eliminar/${departamentoId}`;
    return this.http.delete(url);
  }

  getDepartamento (){
    return this.http.get<DepartamentosViewModel[]>(this.Url);
  }
}