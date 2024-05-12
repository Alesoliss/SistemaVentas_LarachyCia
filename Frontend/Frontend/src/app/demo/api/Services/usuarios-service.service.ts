import { Injectable } from '@angular/core';
import {UsuariosViewModel,Fill} from '../Models/UsuariosViewModel';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { dropEmpleado } from '../Models/EmpleadosViewModel';
import { dropRol } from '../Models/RolesViewModel';
import { BASE_URL } from './urlsettings';
interface Pantalla {
  pantalla: string;
}
@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44300/api/Usuario/Listado';
  getUsuarios (){
    return this.http.get<UsuariosViewModel[]>(this.Url);
  }
  private baseUrl = 'https://localhost:44300/api/Usuario';

 
  login(usuario: string, contraseña: string): Observable<any> {
    const url = `${this.baseUrl}/Login/${encodeURIComponent(usuario)},${encodeURIComponent(contraseña)}`;
    return this.http.get<any>(url);
  }



  
EnviarUsuario(formData: any): Observable<any> {
  return this.http.post<any>(BASE_URL + 'api/Usuario/Insert', formData).pipe(
    map(response => {
      return response;
    }),
  );
}

getFill(codigo: string): Observable<Fill> {
  return this.http.get<Fill>(`${BASE_URL + 'api/Usuario/Detalles/' + codigo}`);
}
EliminarUsuario(ID): Observable<any>{
  return this.http.delete<any>(`${BASE_URL + 'api/Usuario/Delete/' + ID}`)
}
ActualizarUsuario(formData){
  return this.http.put(BASE_URL + 'api/Usuario/Update/', formData)
}
  urlDrop = BASE_URL + 'API/Empleados/DropDown'

  getDropDownEmpleado(){
    return this.http.get<dropEmpleado[]>(this.urlDrop)
  }

  urlDropRol = BASE_URL + 'API/Rol/DropDown'

  getDropDownRol(){
    return this.http.get<dropRol[]>(this.urlDropRol)
  }
  private rolurl = 'https://localhost:44300/API/';
  UrlPantallasRoles = this.rolurl + 'Rol/'
  getPantallasDeRol(idRoll: Number) {
    return this.http.get<Pantalla[]>(`${this.UrlPantallasRoles}Listado/${idRoll}`);
  }


}