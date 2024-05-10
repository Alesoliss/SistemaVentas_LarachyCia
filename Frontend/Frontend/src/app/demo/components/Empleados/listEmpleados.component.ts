import { Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table, TableModule } from 'primeng/table';
import { EmpleadoViewModel, EmpleadoEnviar, Fill} from '../../api/Models/EmpleadosViewModel';
import { EmpleadosServiceService } from '../../api/Services/empleados-service.service';
// import { MunicipiosServiceService } from '../../api/Services/municipios-service.service';
import { FormGroup, FormControl,  Validators, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { dropSucursales } from '../../api/Models/SucursalesViewModel';
import { dropMunicipio } from '../../api/Models/MunicipiosViewModel';
import { dropDepartamento } from '../../api/Models/DepartamentosViewModel';
import { dropEstadoCivil } from '../../api/Models/EstadosCivilesViewModel';
import { dropCargo } from '../../api/Models/CargosViewModel';
import { MensajeViewModel } from '../../api/Models/MensajeViewModel';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MatExpansionModule } from '@angular/material/expansion';
import { DropdownModule } from "primeng/dropdown";
import { RippleModule } from 'primeng/ripple';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
@Component({
  templateUrl: './listEmpleados.component.html',
  styleUrl: './listEmpleados.component.css',
  providers: [ConfirmationService, MessageService]
})
export class ListEmpleadoComponent {
  Empleado!:EmpleadoViewModel[];
   
 
  MensajeViewModel!: MensajeViewModel[];
  submitted: boolean = false;
  loading: boolean = false;
  departamentos: any[] = [];
  municipios: any[] = [];
  estadocivil: any[] = [];
  cargo: any[] = [];

  rol: any[] = [];
  fill: any[] = [];
  viewModel: EmpleadoEnviar = new EmpleadoEnviar();
  clienteForm: FormGroup;
 
  @ViewChild('filter') filter!: ElementRef;

  selectedState: any = null;
  Collapse: boolean = false;
  DataTable: boolean = true;
  Detalles: boolean = false;
  Agregar: boolean = true;
  Contrasenas: boolean = true;
  Valor: string = "";
  staticData = [{}];
  Id_Municipio: string = "";
  deleteProductDialog: boolean = false;
  //Detalle
  Detalle_Codigo: number = 0;
  Detalle_DNI: String = "";
  Detalle_PrimerNombre: string = "";
  Detalle_SegundoNombre: String = "";
  Detalle_PrimerApellido: String = "";
  Detalle_SegundoApellido: String = "";
  Detalle_Sexo: String = "";
  Detalle_Estado: String = "";
   Detalle_Cargo: String = "";
   Detalle_Correo: String = "";
   Detalle_Sucurs: String = "";
   Detalle_Direccion: String = "";
  Detalle_Telefono: String = "";
  Detalle_Departamento: String = "";
  Detalle_Municipio: String = "";
  UsuarioCreacion: String = "";
  UsuarioModificacion: String = "";
  FechaCreacion: Date = null;
  FechaModificacion: Date = null;
  ID: string = "";
  MunicipioCodigo: String = "";

  constructor(private service: EmpleadosServiceService, private router: Router,   private messageService: MessageService
  
  
  ) { }


  ngOnInit(): void {
    this.clienteForm = new FormGroup({
      emple_DNI: new FormControl(0,Validators.required),
      emple_PrimerNombre: new FormControl("",Validators.required),
      emple_SegundoNombre: new FormControl("",Validators.required),
      emple_PrimerApellido: new FormControl("",Validators.required),
      emple_SegundoApellido: new FormControl("",Validators.required),
      emple_Telefono: new FormControl("", Validators.required),
      emple_Sexo: new FormControl("", Validators.required),
      emple_Direccion: new FormControl("", Validators.required),
      cargo_Id: new FormControl("", Validators.required),
      estad_Id: new FormControl("", Validators.required),
      sucur_Id: new FormControl("", Validators.required),
      emple_Correo: new FormControl("", Validators.required),


      depar_Id: new FormControl("0", [Validators.required]),
      munic_Id: new FormControl("0", [Validators.required]),
    });
    this.service.getDropDownsDepartamentos().subscribe((data: dropDepartamento[]) => {
    console.log(data);
    this.departamentos = data;
    });

    this.service.getDropDownsEstado().subscribe((data: dropEstadoCivil[]) => {
      console.log(data);
      this.estadocivil = data;
      });


      this.service.getDropDownCargo().subscribe((data: dropCargo[]) => {
        console.log(data);
        this.cargo = data;
        });
        this.service.getDropDownsSucursal().subscribe((data: dropSucursales[]) => {
          console.log(data);
          this.rol = data;
          });
        

    this.service.getCargo().subscribe((data: any)=>{
        console.log(data);
        this.Empleado = data;
      },error=>{
        console.log(error);
      });
   }
   ValidarNumeros(event: KeyboardEvent) {
    if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab') {
        event.preventDefault();
    }
  }
   onDepartmentChange(departmentId) {
    if (departmentId !== '0') {
      this.service.getMunicipios(departmentId).subscribe(
        (data: any) => {
          this.municipios = data; 
          this.clienteForm.get('munic_Id').setValue('0'); 
        },
        error => {
          console.error('Error fetching municipios:', error);
        }
      );
    } else {
      this.municipios = []; // Clear municipios if the department is invalid or reset
    }
  }
   collapse(){
    this.Collapse= true;
    this.DataTable = false;
    this.Valor = "Agregar";
    this.Agregar= false;
    this.Detalles = false;
}
detalles(codigo){
    this.Collapse= false;
    this.DataTable = false;
    this.Agregar= false;
    this.Detalles = true;
    this.service.getFill(codigo).subscribe({
      next: (data: Fill) => {
         this.Detalle_DNI = data.emple_DNI,
         this.Detalle_PrimerNombre = data.emple_PrimerNombre,
         this.Detalle_SegundoApellido = data.emple_SegundoApellido,
         this.Detalle_Sexo = data.emple_Sexo,
         this.Detalle_Estado = data.estad_Descripcion,
        this.Detalle_Cargo = data.cargo_Descripcion,
        this.Detalle_Sucurs = data.sucur_Descripcion,
        this.Detalle_Correo = data.emple_Correo,

         this.Detalle_Direccion = data.emple_Direccion,
         this.Detalle_Departamento = data.depa_Departamento,
         this.Detalle_Municipio = data.munic_Descripcion,
         this.UsuarioCreacion = data.usuarioCreacion,
         this.UsuarioModificacion = data.usuarioModificacion
         this.FechaCreacion = data.emple_FechaCreacion,
         this.FechaModificacion = data.emple_FechaModificacion
      }
    });
    this.ngOnInit();
}
//Cerrar Collapse y reiniciar el form
cancelar(){
    this.Collapse= false;
    this.DataTable = true;
    this.Detalles = false;
    this.ngOnInit();
    this.submitted = false;
    this.Agregar= true;
    this.Valor = "";
}

validarTexto(event: KeyboardEvent) {
  if (!/^[-a-zA-Z\s-áéíóúÁÉÍÓÚüÜñÑ,.?!¡¿@#$%&*()]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
  }
}


validarCorreo(event: KeyboardEvent) {
  if (!/^[-a-zA-Z\s-áéíóúÁÉÍÓÚüÜñÑ,.?!¡¿@#$%&*()]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
  }
}


ValidarNumero(event: KeyboardEvent) {
  if (!/^[0-9\s-]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
  }
}
onSubmit() {
  if (this.clienteForm.valid && this.clienteForm.get('depar_Id').value !== '0' && this.clienteForm.get('munic_Id').value !== '0'&& this.clienteForm.get('estad_Id').value !== '0' ) {
     this.viewModel = this.clienteForm.value;
     if (this.Valor == "Agregar") {
      this.service.EnviarEmpleado(this.viewModel).subscribe((data: MensajeViewModel[]) => {
          if(data["message"] == "Operación completada exitosamente."){
          this.ngOnInit();
           this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
           this.Collapse= false;
           this.DataTable = true;
           this.submitted = false;
           this.Detalles = false;
           this.Agregar= true;
          }else{
           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro insertar', life: 3000 });
          }
       })
     } else {
      this.viewModel.emple_Id = this.ID
          this.service.ActualizarEmpleado(this.viewModel).subscribe((data: MensajeViewModel[]) => {
          if(data["message"] == "Operación completada exitosamente."){
            this.ngOnInit();
           this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Actualizado con Exito', life: 3000 });
           this.Collapse= false;
           this.DataTable = true;
           this.Detalles = false;
           this.submitted = false;
           this.Agregar= true;
          }else{
           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro actualizar', life: 3000 });
          }
          
       })
     }  
     
  }   
      else 
      {
          this.submitted = true;
      }
  } 


  deleteSelectedProducts(codigo) {
    this.deleteProductDialog = true;
    this.ID = codigo;
    console.log("El codigo es" + codigo);
  }
confirmDelete() {
    this.service.EliminarEmpleado(this.ID).subscribe({
        next: (response) => {
            if(response.message == "La accion ha sido existosa"){
               
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con Exito', life: 3000 });
                this.Collapse= false;
                this.DataTable = true;
                this.Detalles = false;
                this.submitted = false;
                this.deleteProductDialog = false;
                this.ngOnInit();
               }else{
                this.deleteProductDialog = false;
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro eliminar', life: 3000 });
               }
        },
    });

}
Fill(codigo) {
    this.service.getFill(codigo).subscribe({
        next: (data: Fill) => {

          this.clienteForm = new FormGroup({
            emple_DNI: new FormControl(data.emple_DNI,Validators.required),
            emple_PrimerNombre: new FormControl(data.emple_PrimerNombre,Validators.required),
            emple_SegundoNombre: new FormControl(data.emple_SegundoNombre,Validators.required),
            emple_PrimerApellido: new FormControl(data.emple_PrimerApellido,Validators.required),
            emple_SegundoApellido: new FormControl(data.emple_SegundoApellido,Validators.required),
            emple_Telefono: new FormControl(data.emple_Telefono, Validators.required),
            emple_Sexo: new FormControl(data.emple_Sexo, Validators.required),
            emple_Direccion: new FormControl(data.emple_Direccion, Validators.required),
            cargo_Id: new FormControl(data.cargo_Id, Validators.required),
            estad_Id: new FormControl(data.estad_Id, Validators.required),
            sucur_Id: new FormControl(data.sucur_Id, Validators.required),
            emple_Correo: new FormControl(data.emple_Correo, Validators.required),

   
            depar_Id: new FormControl(data.depar_Id, [Validators.required]),
            munic_Id: new FormControl(data.munic_Id, [Validators.required]),
        });

          this.MunicipioCodigo = data.munic_Id;
          console.log(this.MunicipioCodigo);
          this.service.getMunicipios(data.depar_Id).subscribe(
            (data: any) => {
              this.municipios = data; 
              this.clienteForm.get('munic_Id').setValue(this.MunicipioCodigo); 
            }
          );
            this.ID = data.emple_Id;
            this.Collapse= true;
            this.DataTable = false;
            this.Agregar = false;
            this.Detalles = false;
            this.Contrasenas = false;
            this.Valor = "Editar";
        }
      });

}
}


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ToastModule ,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
		DropdownModule,
    RippleModule,
		ConfirmPopupModule
  ],
  declarations: [ListEmpleadoComponent]
})
export class DepartamentosListadoModule {}
