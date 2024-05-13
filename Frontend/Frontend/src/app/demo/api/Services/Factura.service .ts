import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/demo/api/Services/urlsettings';
import { Factura,Fill,FacturaDetalle } from 'src/app/demo/components/Models/FacturaViewModel';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { Metodo } from 'src/app/demo/components/Models/MetodoPagoViewModel';
import { Cliente } from 'src/app/demo/components/Models/ClienteViewModel';
import { Producto } from 'src/app/demo/components/Models/ProductosViewModel';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }
  urlClientes = BASE_URL + 'API/Clientes/Listado'

  getClientes(){
    return this.http.get<Cliente[]>(this.urlClientes)
  }

  

  urlProductos = BASE_URL + 'api/Productos/Listado'

  getproductos(){
    return this.http.get<Producto[]>(this.urlProductos)
  }

  

  urlMetodo = BASE_URL + 'API/MetodoPago/Listado'

  getMetodo(){
    return this.http.get<Metodo[]>(this.urlMetodo)
  }


  url = BASE_URL + 'API/Factura/List'

  getFacturas(){
    return this.http.get<Factura[]>(this.url)
  }


  getFacturasDetalle(id){
    return this.http.get<FacturaDetalle[]>(BASE_URL + 'API/Factura/ListaDetalles/' + id)
  }


  EnviarFactura(formData: any): Observable<any> {
    return this.http.post<any>(BASE_URL + 'API/Factura/Create/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }
  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'API/Factura/Fill/' + codigo}`);
  }
  EliminarFactura(ID): Observable<any>{
    return this.http.delete<any>(`${BASE_URL + 'API/Factura/Delete/' + ID}`)
  }

   EliminarDetalles(ID,Prod_Nombre): Observable<any>{
    return this.http.delete<any>(`${BASE_URL + 'API/Factura/DeleteDetalle/' + ID + ',' +  Prod_Nombre}`)
  }
  ActualizarFactura(formData){
    return this.http.put(BASE_URL + 'API/Factura/Edit/', formData)
  }



  // EmitirFactura(formData){
  //   return this.http.put<any>(BASE_URL + 'API/Factura/FaturaEmitida/', formData)
  // }


  EmitirFactura(id){
    return this.http.get<any>(BASE_URL + 'API/Factura/FaturaEmitida/' + id)
  }

}
