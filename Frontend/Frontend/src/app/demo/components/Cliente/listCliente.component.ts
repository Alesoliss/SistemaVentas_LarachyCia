import { Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table, TableModule } from 'primeng/table';
import { ClienteViewModel,ClienteEnviar,Fill } from '../../api/Models/ClientesViewModel';
import { ClienteServiceService } from '../../api/Services/clientes-service.service';
import { MensajeViewModel } from '../../api/Models/MensajeViewModel';
import { FormGroup, FormControl,  Validators, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { dropDepartamento } from '../../api/Models/DepartamentosViewModel';
import { dropMunicipio } from '../../api/Models/MunicipiosViewModel';
import { dropEstadoCivil } from '../../api/Models/EstadosCivilesViewModel';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MatExpansionModule } from '@angular/material/expansion';
@Component({
  templateUrl: './listCliente.component.html',
  styleUrl: './listCliente.component.css',
  providers: [ConfirmationService, MessageService]
})
export class ListClienteComponent implements OnInit{
  Cliente!:ClienteViewModel[];
    
  MensajeViewModel!: MensajeViewModel[];
  submitted: boolean = false;
  loading: boolean = false;
  departamentos: any[] = [];
  municipios: any[] = [];
  estadocivil: any[] = [];
  cargo: any[] = [];

  rol: any[] = [];
  fill: any[] = [];
  viewModel: ClienteEnviar = new ClienteEnviar();
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
  Detalle_DNI: String = "";
  Detalle_Codigo: String = "";
  Detalle_Nombre: String = "";
  Detalle_Nombre2: String = "";
  Detalle_Apellido: String = "";
  Detalle_Apellido2: String = "";
  Detalle_Sexo: String = "";
  Detalle_Estado: String = "";
   Detalle_Direccion: String = "";
  Detalle_Telefono: String = "";
  Detalle_Correo: String = "";
  Detalle_Departamento: String = "";
  Detalle_Municipio: String = "";
  UsuarioCreacion: String = "";
  UsuarioModificacion: String = "";
  FechaCreacion: Date = null;
  FechaModificacion: Date = null;
  ID: string = "";
  MunicipioCodigo: String = "";

  constructor(private service: ClienteServiceService, private router: Router,   private messageService: MessageService
  
  ) { }


  ngOnInit(): void {
    this.clienteForm = new FormGroup({
      Clien_PrimerNombre: new FormControl("", [Validators.required]),
      Clien_SegundoNombre: new FormControl ("", [Validators.required]),
      Clien_PrimerApellido: new FormControl("", [Validators.required]),
      Clien_SegundoApellido: new FormControl ("", [Validators.required]),
      Clien_Sexo: new FormControl ("", [Validators.required]),
      Clien_Direccion: new FormControl("", [Validators.required]),
      Clien_Telefono: new FormControl ("", [Validators.required]),
      Clien_Correo: new FormControl ("", [Validators.required]),
      Estad_Id: new FormControl ("", [Validators.required]),
      Depa_Codigo: new FormControl("0", [Validators.required]),
      Munic_Id:  new FormControl("0", [Validators.required]),
    });
    this.service.getDropDownsDepartamentos().subscribe((data: dropDepartamento[]) => {
    console.log(data);
    this.departamentos = data;
    });

    this.service.getDropDownsEstado().subscribe((data: dropEstadoCivil[]) => {
      console.log(data);
      this.estadocivil = data;
      });


    


    this.service.getCliente().subscribe((data: any)=>{
        console.log(data);
        this.Cliente = data;
      },error=>{
        console.log(error);
      });
   }
   onDepartmentChange(departmentId) {
    if (departmentId !== '0') {
      this.service.getMunicipios(departmentId).subscribe(
        (data: any) => {
          this.municipios = data; 
          this.clienteForm.get('Munic_Id').setValue('0'); 
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
        this.Detalle_Codigo = data.clien_Id,
        this.Detalle_Nombre = data.clien_PrimerNombre,
        this.Detalle_Nombre2 = data.clien_SegundoNombre,
        this.Detalle_Apellido = data.clien_PrimerApellido,
        this.Detalle_Apellido2 = data.clien_SegundoApellido,
        this.Detalle_Sexo = data.clien_Sexo,
        this.Detalle_Estado = data.estad_Id,
        this.Detalle_Correo = data.clien_Correo;
         this.Detalle_Direccion = data.clien_Direccion,
        this.Detalle_Telefono = data.clien_Telefono,
        this.Detalle_Departamento = data.depar_Id,
        this.Detalle_Municipio = data.munic_Id,
        this.UsuarioCreacion = data.usuarioCreacion,
        this.UsuarioModificacion = data.usuarioModificacion
        this.FechaCreacion = data.clien_FechaCreacion,
        this.FechaModificacion = data.clien_FechaModificacion
      }
    });
    this.ngOnInit();
}
ValidarNumeros(event: KeyboardEvent) {
  if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab') {
      event.preventDefault();
  }
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
  if (!/^[-a-zA-Z\s-]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
  }
}
ValidarNumero(event: KeyboardEvent) {
  if (!/^[0-9\s-]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
  }
}
onSubmit() {
  if (this.clienteForm.valid && this.clienteForm.get('Depa_Codigo').value !== '0' && this.clienteForm.get('Munic_Id').value !== '0'&& this.clienteForm.get('Estad_Id').value !== '0' ) {
     this.viewModel = this.clienteForm.value;
     if (this.Valor == "Agregar") {
      this.service.EnviarCliente(this.viewModel).subscribe((data: MensajeViewModel[]) => {
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
      this.viewModel.Clien_Id = this.ID
          this.service.ActualizarCliente(this.viewModel).subscribe((data: MensajeViewModel[]) => {
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
    this.service.EliminarCliente(this.ID).subscribe({
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
            Clien_PrimerNombre: new FormControl(data.clien_PrimerNombre,Validators.required),
            Clien_SegundoNombre: new FormControl(data.clien_SegundoNombre,Validators.required),
            Clien_PrimerApellido: new FormControl(data.clien_PrimerApellido, Validators.required),
            Clien_SegundoApellido: new FormControl(data.clien_SegundoApellido, Validators.required),
            Clien_Sexo: new FormControl(data.clien_Sexo, Validators.required),
            Clien_Direccion: new FormControl(data.clien_Direccion, Validators.required),
            Clien_Telefono: new FormControl(data.clien_Telefono, Validators.required),
            Clien_Correo: new FormControl(data.clien_Correo, Validators.required),
            Estad_Id: new FormControl(data.estad_Id, Validators.required),
            Depa_Codigo: new FormControl(data.depar_Id, [Validators.required]),
            Munic_Id: new FormControl(data.munic_Id, [Validators.required]),
          });

          this.MunicipioCodigo = data.munic_Id;
          console.log(this.MunicipioCodigo);
          this.service.getMunicipios(data.depar_Id).subscribe(
            (data: any) => {
              this.municipios = data; 
              this.clienteForm.get('Munic_Id').setValue(this.MunicipioCodigo); 
            }
          );
            this.ID = data.clien_Id;
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
  declarations: [ListClienteComponent]
})
export class DepartamentosListadoModule {}
