import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CargosViewModel,Fill } from '../Models/CargosViewModel';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargosServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44300/API/Cargo/Listado';
  private baseUrl = 'http://sistemalarach.somee.com/API/Cargo';

  insertarCargo(formData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Create/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }


  actualizarCargo(categoria: CargosViewModel): Observable<any> {
    const url = `${this.baseUrl}/Actualizar`;
    return this.http.put(url, categoria);
  }
  
  getDetalles(codigo: number): Observable<Fill> {
    return this.http.get<Fill>(`${'http://sistemalarach.somee.com/API/Cargo/Detalles/' + codigo}`);
  }

  eliminarCargo(categoriaId: number): Observable<any> {
    const url = `${this.baseUrl}/Eliminar/${categoriaId}`;
    return this.http.delete(url);
  }

  getCargo (){
    return this.http.get<CargosViewModel[]>(this.Url);
  }

}