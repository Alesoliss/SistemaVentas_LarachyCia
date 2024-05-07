import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductosViewModel,Fill } from '../Models/ProductoViewModel';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosServiceService {

  constructor(private http: HttpClient) { }
  Url = 'http://sistemalarach.somee.com/api/Productos/Listado';
  private baseUrl = 'http://sistemalarach.somee.com/api/Productos';

  
  insertarProductos(municipio: ProductosViewModel): Observable<any> {
    const url = `${this.baseUrl}/Insert/Productos`;

    // Asegúrate de que los datos se envíen en formato JSON
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Envía la solicitud POST con los datos y opciones de encabezado
    return this.http.post<ProductosViewModel>(url, municipio, httpOptions);
  }


  actualizarProducto(categoria: ProductosViewModel): Observable<any> {
    const url = `${this.baseUrl}/Update`;
    return this.http.put(url, categoria);
  }
  
  getDetalles(codigo: number): Observable<Fill> {
    return this.http.get<Fill>(`${'http://sistemalarach.somee.com/api/Productos/Detalles/' + codigo}`);
  }

  eliminarProducto(categoriaId: number): Observable<any> {
    const url = `${this.baseUrl}/Delete/${categoriaId}`;
    return this.http.delete(url);
  }
  getCargo (){
    return this.http.get<ProductosViewModel[]>(this.Url);
  }
}