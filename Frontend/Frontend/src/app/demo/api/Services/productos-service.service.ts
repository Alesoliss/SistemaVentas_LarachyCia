import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ProductosViewModel } from '../Models/ProductoViewModel';


@Injectable({
  providedIn: 'root'
})
export class ProductosServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44300/api/Productos/Listado';

  getCargo (){
    return this.http.get<ProductosViewModel[]>(this.Url);
  }
}