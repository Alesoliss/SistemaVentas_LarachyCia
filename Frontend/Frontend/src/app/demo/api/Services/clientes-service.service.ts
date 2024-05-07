import { Injectable } from '@angular/core';
import {ClienteViewModel} from '../Models/ClientesViewModel';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  constructor(private http: HttpClient) { }
  Url = 'http://sistemalarach.somee.com/API/Clientes/Listado';

  getCliente (){
    return this.http.get<ClienteViewModel[]>(this.Url);
  }
}