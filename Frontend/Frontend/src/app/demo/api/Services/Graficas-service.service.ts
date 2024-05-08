import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  getMaquillajemes(){
    return this.http.get<ProductoMasCompradoMes[]>(this.urlE)
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









}
