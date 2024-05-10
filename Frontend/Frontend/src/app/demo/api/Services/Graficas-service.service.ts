import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './urlsettings';
import { ProductoMasCompradoMes,TotalVentasPorCategoria,ProductoMes,Ventatotalescatgoria } from '../../api/Models/GraficoViewModel';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }


  // url = 'API/Graficos/VentaMes'

  // getproducto(){
  //   return this.http.get<Productos[]>(this.url)
  // }

  
  urlE ='https://localhost:44300/api/Grafico/ProductoMasCompradoMes'

  getMaquillajemes(): Observable<any[]> {
    return this.http.get<any[]>(this.urlE);
  }


  urlj =  'https://localhost:44300/api/Grafico/TotalVentasPorCategoria'

  getJoyas(){
    return this.http.get<TotalVentasPorCategoria[]>(this.urlj)
  }


  urlmj = 'https://localhost:44300/api/Grafico/ProductoMes'

  getMaquioJoya(){
    return this.http.get<ProductoMes[]>(this.urlmj)
  }









  // urlmjt = BASE_URL + 'API/Graficos/JoyatotalMes'

  // gettj(){
  //   return this.http.get<totalJo[]>(this.urlmjt)
  // }


  // urlmt = BASE_URL + 'API/Graficos/MaquillajetotalMes'

  // gettm(){
  //   return this.http.get<totalMa[]>(this.urlmt)
  // }







  // urltt = BASE_URL + 'API/Graficos/Ventatotales'

  // getto(){
  //   return this.http.get<totalanual[]>(this.urltt)
  // }



  urltc =  'https://localhost:44300/api/Grafico/Ventatotalescatgoria'

  gettc(){
    return this.http.get<Ventatotalescatgoria[]>(this.urltc)
  }

////////////////FILTRADOS //////////////////


// getJoyasf(fecha: string): Observable<JoyaMes> {
//   return this.http.get<JoyaMes>(`${BASE_URL + 'API/Graficos/JoyaMesfiltrado' + fecha}`);
// }




// getMaquioJoyaf(fecha: string): Observable<MaqJoyaMes> {
//   return this.http.get<MaqJoyaMes>(`${BASE_URL + 'API/Graficos/ProductoMesfiltrado' + fecha}`);
// }





// gettjf(fecha: string): Observable<totalJo> {
//   return this.http.get<totalJo>(`${BASE_URL + 'API/Graficos/JoyatotalMesfiltrado' + fecha}`);
// }






// gettmf(fecha: string): Observable<totalMa> {
//   return this.http.get<totalMa>(`${BASE_URL + 'API/Graficos/MaquillajetotalMesfiltrado' + fecha}`);
// }


private apiUrl: string = BASE_URL + "api/Grafico/";

VentasPorMes(): Observable<{ anio: string, mes: string,mode_Descripcion: string, cantidadVentas: number }[]> {
  return this.http.get<{ anio: string, mes: string, mode_Descripcion:string, cantidadVentas: number }[]>(`${this.apiUrl}VentasPorMes`);
} 

ProductosVendidosPorCategoriaMesAnio(): Observable<{ anio: string, mes: string,categ_Descripcion: string, cantidadProductosVendidos: number }[]> {
  return this.http.get<{ anio: string, mes: string,categ_Descripcion: string, cantidadProductosVendidos: number }[]>(`${this.apiUrl}ProductosVendidosPorCategoriaMesAnio`);
} 
obtenerPrestaPorEstado(): Observable<{ anio: string, mes: string,estad_Descripcion: string, cantidadCompras: number }[]> {
  return this.http.get<{ anio: string, mes: string, estad_Descripcion:string, cantidadCompras: number }[]>(`${this.apiUrl}ComprasPorEstadoCivil`);
} 





}
