import { Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table, TableModule } from 'primeng/table';
import { UsuarioEnviar, UsuariosViewModel,Fill } from '../../api/Models/UsuariosViewModel';
import { UsuariosServiceService } from '../../api/Services/usuarios-service.service';
import { FormGroup, FormControl,  Validators, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {  MensajeViewModel} from '../../api/Models/MensajeViewModel';
import { EmpleadoEnviar, dropEmpleado } from '../../api/Models/EmpleadosViewModel';
import { dropRol } from '../../api/Models/RolesViewModel';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ListEmpleadoComponent } from '../Empleados/listEmpleados.component';
import { MatExpansionModule } from '@angular/material/expansion';
@Component({
  templateUrl: './listUsuarios.component.html',
  styleUrl: './listUsuarios.component.css',
  providers: [ConfirmationService, MessageService]
})
export class ListUsuarioComponent {
  Usuario!:UsuariosViewModel[];
  MensajeViewModel!: MensajeViewModel[];
  submitted: boolean = false;
  loading: boolean = false;
  empleados: any[] = [];
  rol: any[] = [];
  fill: any[] = [];
  viewModel: UsuarioEnviar = new UsuarioEnviar();
  usuarioForm: FormGroup;
  @ViewChild('filter') filter!: ElementRef;

  selectedState: any = null;
  Collapse: boolean = false;
  DataTable: boolean = true;
  Detalles: boolean = false;
  Agregar: boolean = true;
  Contrasenas: boolean = true;
  Valor: string = "";
  staticData = [{}];
  
  deleteProductDialog: boolean = false;
  //Detalle
  Detalle_Usuario: String = "";
  Detalle_Administrador: String = "";
  Detalle_Empleado: String = "";
  Detalle_Rol: String = "";
  UsuarioCreacion: String = "";
  UsuarioModificacion: String = "";
  FechaCreacion: String = "";
  FechaModificacion: String = "";
  ID?: string = '';
  constructor(private service: UsuariosServiceService, private router: Router,     private messageService: MessageService
  
  ) { }


  ngOnInit(): void {
    this.usuarioForm = new FormGroup({
      Usuar_Usuario: new FormControl("",Validators.required),
      Usuar_Contrasena: new FormControl("", Validators.required),
      Usuar_Admin: new FormControl(false, [Validators.required]),
      Perso_Id: new FormControl('0', [Validators.required]),
      Roles_Id: new FormControl('0', [Validators.required]),
    });

    this.service.getDropDownEmpleado().subscribe((data: dropEmpleado[]) => {
      this.empleados = data;
    });
    this.service.getDropDownRol().subscribe((data: dropRol[]) => {
      this.rol = data;
    });

      this.service.getUsuarios().subscribe((data: any)=>{
          console.log(data);
          this.Usuario = data;
      },error=>{
        console.log(error);
      });
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
         this.Detalle_Usuario = data.usuar_Usuario,
         this.Detalle_Administrador = data.usuar_Admin,
         this.Detalle_Rol = data.roles_Id,
         this.Detalle_Empleado = data.perso_Id,
         this.UsuarioCreacion = data.usuarioCreacion,
         this.UsuarioModificacion = data.usuarioModificacion
         this.FechaCreacion = data.fechaCreacion,
         this.FechaModificacion = data.fechaModificacion
      }
    });
}
cancelar(){
  this.Collapse= false;
  this.DataTable = true;
  this.Detalles = false;
  this.ngOnInit();
  this.submitted = false;
  this.Agregar= true;
  this.Contrasenas = true;
  this.Valor = "";
}

ValidarNumeros(event: KeyboardEvent) {
  if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab') {
      event.preventDefault();
  }
}
validarTexto(event: KeyboardEvent) {

  if (!/^[a-zA-Z\s]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
  }
}
validarTextoNumeros(event: KeyboardEvent) {

  if (!/^[0-9-a-zA-Z.@_\s-]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
  }
}
onSubmit() {
  if (this.usuarioForm.valid && this.usuarioForm.get('Perso_Id').value !== '0' && this.usuarioForm.get('Roles_Id').value !== '0') {
     this.viewModel = this.usuarioForm.value;
     if (this.Valor == "Agregar") {
      this.service.EnviarUsuario(this.viewModel).subscribe((data: MensajeViewModel[]) => {
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
          this.viewModel.usuar_Id = this.ID;
          this.service.ActualizarUsuario(this.viewModel).subscribe((data: MensajeViewModel[]) => {
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

  municipioSeleccionadoId: string = '';

  deleteSelectedProducts(municipioId: string): void {
    console.log('ID:', municipioId);
    // Almacena el ID del municipio seleccionado
    this.municipioSeleccionadoId = municipioId;
    // Muestra el modal de confirmación
    this.deleteProductDialog = true;
}

confirmDelete(): void {
  if (this.municipioSeleccionadoId) {
      this.service.EliminarUsuario(this.municipioSeleccionadoId).subscribe(
          (response) => {
              console.log('Proveedor eliminado exitosamente', response);

              // Añadimos un mensaje de éxito aquí para verificar si se ejecuta
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Municipio eliminado correctamente' });
              this.DataTable = true;
              this.Collapse= false;
              // this.get();
              this.municipioSeleccionadoId = '';
          },
          (error) => {
            this.messageService.add({ severity: 'Error', summary: 'Danger Message', detail: 'El Municipio no se eliminado correctamente' });
              this.municipioSeleccionadoId = '';
          }
      );
  } else {
      console.error('ID del municipio seleccionado está vacío');
  }
  this.deleteProductDialog = false;
}
Fill(codigo) {
    this.service.getFill(codigo).subscribe({
        next: (data: Fill) => {
          this.usuarioForm = new FormGroup({
            Usuar_Usuario: new FormControl(data.usuar_Usuario,Validators.required),
            Usuar_Contrasena: new FormControl("x", Validators.required),
            Usuar_Admin: new FormControl(data.usuar_Admin, [Validators.required]),
            Perso_Id: new FormControl(data.emple_Id, [Validators.required]),
            Roles_Id: new FormControl(data.roles_Id, [Validators.required]),
          });
            this.ID = data.usuar_Id;
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
  declarations: [ListUsuarioComponent]
})
export class DepartamentosListadoModule {}