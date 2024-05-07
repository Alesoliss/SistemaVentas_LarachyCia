import { Injectable } from '@angular/core';
import {GraficosViewModel,Fill} from '../Models/GraficoViewModel';
import {HttpClient} from '@angular/common/http';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraficasServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44300/api/Grafico/Grafico1';
  Url2 = 'https://localhost:44300/api/Grafico/Grafico2';
  Url3 = 'https://localhost:44300/api/Grafico/Grafico3';
  Url4 = 'https://localhost:44300/api/Grafico/Grafico4';
  Url5 = 'https://localhost:44300/API/EstadosCiviles/Listado';

  
  getGrafico1 (){
    return this.http.get<GraficosViewModel[]>(this.Url);
  }


  getGrafico2 (){
    return this.http.get<GraficosViewModel[]>(this.Url2);
  }
  
  getGrafico3 (){
    return this.http.get<GraficosViewModel[]>(this.Url3);
  }
  getGrafico4 (){
    return this.http.get<GraficosViewModel[]>(this.Url4);
  }
  getGrafico5 (){
    return this.http.get<GraficosViewModel[]>(this.Url);
  }
}