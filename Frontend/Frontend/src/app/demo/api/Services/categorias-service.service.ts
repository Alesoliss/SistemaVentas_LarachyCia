import { Injectable } from '@angular/core';
import {CategoriasViewModel,Fill} from '../Models/CategoriasViewModel';
import {HttpClient} from '@angular/common/http';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasServiceservice {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44300/API/Categoria/Listado';
  private baseUrl = 'https://localhost:44300/API/Categoria';
  
  insertarCategoria(formData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Create/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }


  actualizarCategoria(categoria: CategoriasViewModel): Observable<any> {
    const url = `${this.baseUrl}/Actualizar`;
    return this.http.put(url, categoria);
  }
  
 
  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`https://localhost:44300/API/Categoria/Detalles?Categ_Id=${codigo}`);
  }



  getdetalles(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`https://localhost:44300/API/Categoria/Detalles?Categ_Id=${codigo}`);
  }

  eliminarCategoria(categoriaId: number): Observable<any> {
    const url = `${this.baseUrl}/Eliminar/${categoriaId}`;
    return this.http.delete(url);
  }

  getCategoria (){
    return this.http.get<CategoriasViewModel[]>(this.Url);
  }
}