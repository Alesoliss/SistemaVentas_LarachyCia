import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // Importa Observable desde RxJS
import { VentasEncabezadoViewModel } from '../Models/VentasEncabezadoViewModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ventasEncabezadoServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44300/ListadoGeneral';
  private baseUrl = 'https://localhost:44300';

  // insertarVentaEncabezado(municipio: VentasEncabezadoViewModel) {
  //   return this.http.post<VentasEncabezadoViewModel>(`${this.baseUrl}/Insert/Encabezado`, municipio);
  // }
  insertarVentaEncabezado(municipio: VentasEncabezadoViewModel): Observable<any> {
    const url = `${this.baseUrl}/Insert/Encabezado`;

    // Asegúrate de que los datos se envíen en formato JSON
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Envía la solicitud POST con los datos y opciones de encabezado
    return this.http.post<VentasEncabezadoViewModel>(url, municipio, httpOptions);
  }
  

// encabezado
//   https://localhost:44300/ListadoGeneral
// encabezado
//   https://localhost:44300/Insert/Encabezado

  actualizarVentaEncabezado(municipio: VentasEncabezadoViewModel): Observable<any> {
    const url = `${this.baseUrl}/Actualizar`;
    return this.http.put(url, municipio);
  }
  


  eliminarVentaEncabezado(encabezadoId: string): Observable<any> {
    const url = `${this.baseUrl}/Eliminar/${encabezadoId}`;
    return this.http.delete(url);
  }

  getEncabezado() {
    return this.http.get<VentasEncabezadoViewModel[]>(this.Url);
  }
}
