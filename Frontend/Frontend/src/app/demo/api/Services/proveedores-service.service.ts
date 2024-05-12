import { Injectable } from '@angular/core';
import {Fill, ProveedoresViewModel} from '../Models/ProveedoresViewModel';
import {HttpClient} from '@angular/common/http';
import { BASE_URL } from './urlsettings';
import { dropMunicipio } from '../Models/MunicipiosViewModel';
import { Observable, map } from 'rxjs';
import { dropDepartamento } from '../Models/DepartamentosViewModel';


@Injectable({
  providedIn: 'root'
})
export class ProveedoresServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44300/API/Proveedores/Listado';

  getProveedor (){
    return this.http.get<ProveedoresViewModel[]>(this.Url);
  }

  urlDrop = BASE_URL + 'API/Departamento/DropDown'
  getMunicipios(codigo){
    return this.http.get<dropMunicipio[]>(BASE_URL + 'API/Municipios/Lista/' + codigo )
  }
  urlDrope = BASE_URL + 'API/Departamento/DropDown'

  getDropDownsDepartamentos(){
    return this.http.get<dropDepartamento[]>(this.urlDrope)
  }
  EnviarProveedor(formData: any): Observable<any> {
    return this.http.post<any>(BASE_URL + 'API/Proveedores/Create', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }
  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'API/Proveedores/Detalles/' + codigo}`);
  }
  EliminarProveedor(ID): Observable<any>{
    return this.http.delete<any>(`${BASE_URL + 'API/Proveedores/Eliminar/' + ID}`)
  }
  ActualizarProveedor(formData){
    return this.http.put(BASE_URL + 'API/Proveedores/Actualizar/', formData)
  }
}