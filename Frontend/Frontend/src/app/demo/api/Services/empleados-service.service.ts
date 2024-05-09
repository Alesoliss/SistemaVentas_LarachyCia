import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { EmpleadoViewModel,Fill } from '../Models/EmpleadosViewModel';
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
export class EmpleadosServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44300/API/Empleados/Listado';

  private baseUrl = 'https://localhost:44300/API/Empleados';

  
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










  


  EnviarEmpleado(formData: any): Observable<any> {
    return this.http.post<any>(  'https://localhost:44300/API/Empleados/Create', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }

    
  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${ 'https://localhost:44300/API/Empleados/Detalles/' + codigo}`);
  }
  EliminarEmpleado(ID): Observable<any>{
    return this.http.delete<any>(`${ 'https://localhost:44300/API/Empleados/Eliminar/' + ID}`)
  }
  ActualizarEmpleado(formData){
    return this.http.put( 'https://localhost:44300/API/Empleados/Actualizar/', formData)
  }

  
  getCargo (){
    return this.http.get<EmpleadoViewModel[]>(this.Url);
  }
}