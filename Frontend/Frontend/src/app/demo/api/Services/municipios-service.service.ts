import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { MunicipiosViewModel, Fill } from '../Models/MunicipiosViewModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44300/API/Municipios/Listado';
  private baseUrl = 'http://sistemalarach.somee.com/API/Municipios';

  insertarMunicipio(municipio: MunicipiosViewModel) {
    return this.http.post<MunicipiosViewModel>(`${this.baseUrl}/Create`, municipio);
  }

  actualizarMunicipio(municipio: MunicipiosViewModel): Observable<any> {
    const url = `${this.baseUrl}/Actualizar`;
    return this.http.put(url, municipio);
  }
  


  eliminarMunicipio(municipioId: string): Observable<any> {
    const url = `${this.baseUrl}/Eliminar/${municipioId}`;
    return this.http.delete(url);
  }

  getMunicipio() {
    return this.http.get<MunicipiosViewModel[]>(this.Url);
  }
  // https://localhost:44300/API/Municipios/Detalles?Munic_Id=05

  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`https://localhost:44300/API/Municipios/Detalles?Munic_Id=${codigo}`);
  }



  getdetalles(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`https://localhost:44300/API/Municipios/Detalles?Munic_Id=${codigo}`);
  }
}
