import { Injectable } from '@angular/core';
import {ClienteViewModel,Fill} from '../Models/ClientesViewModel';
import {HttpClient} from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { BASE_URL } from './urlsettings';
import { dropDepartamento } from '../Models/DepartamentosViewModel';
import { dropMunicipio } from '../Models/MunicipiosViewModel';
import { dropEstadoCivil } from '../Models/EstadosCivilesViewModel';
import { dropCargo } from '../Models/CargosViewModel';
import { dropSucursales } from '../Models/SucursalesViewModel';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44300/API/Clientes/Listado';

  private baseUrl = 'https://localhost:44300/API/Clientes/';

  
  urlDrop = BASE_URL + 'API/Departamento/DropDown'

  getDropDownsDepartamentos(){
    return this.http.get<dropDepartamento[]>(this.urlDrop)
  }

  getMunicipios(codigo){
    return this.http.get<dropMunicipio[]>(BASE_URL + 'API/Municipios/Lista/' + codigo )
  }



  urlDropC = BASE_URL + 'API/Cargo/DropDown'

  getDropDownCargo(){
    return this.http.get<dropCargo[]>(this.urlDropC)
  }
  urlDropE = BASE_URL + 'API/EstadosCiviles/DropDown'

  getDropDownsEstado(){
    return this.http.get<dropEstadoCivil[]>(this.urlDropE)
  }

  urlDropS = BASE_URL + 'API/Sucursales/DropDown'

  getDropDownsSucursal(){
    return this.http.get<dropSucursales[]>(this.urlDropS)
  }










  


  EnviarCliente(formData: any): Observable<any> {
    return this.http.post<any>(  'https://localhost:44300/API/Clientes/Create', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }

    
  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${ 'https://localhost:44300/API/Clientes/Detalles/' + codigo}`);
  }
  EliminarCliente(ID): Observable<any>{
    return this.http.delete<any>(`${ 'https://localhost:44300/API/Clientes/Eliminar/' + ID}`)
  }
  ActualizarCliente(formData){
    return this.http.put( 'https://localhost:44300/API/Clientes/Actualizar/', formData)
  }
  getCliente (){
    return this.http.get<ClienteViewModel[]>(this.Url);
  }
}