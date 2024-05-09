import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl,  Validators  } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { SucursalesViewModel, Fill } from '../../api/Models/SucursalesViewModel';

import { MunicipiosServiceService } from '../../api/Services/municipios-service.service';
import { SucursalServiceService } from '../../api/Services/sucursal-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
 import { ToastModule } from 'primeng/toast'; 
 import { MensajeViewModel } from '../../api/Models/MensajeViewModel';



@Component({
  selector: 'app-list',
  templateUrl: './listSucursal.component.html',
  styleUrls: ['./listSucursales.component.css'],
  providers: [MessageService]
})
export class SucursalesListadoComponent implements OnInit {
  sucursal!: SucursalesViewModel[];
  UsuarioId: boolean = true;
  showModal: boolean = false;
  Collapse: boolean = false;
  Detalles: boolean = false;
  sucursalForm: FormGroup;
  editModal: boolean = false;
  showDeleteConfirmation: boolean = false;
  MensajeViewModel!: MensajeViewModel[];
  deleteModal: boolean = false;
   sucursalSeleccionado: SucursalesViewModel = { 
    sucur_Id: 0, 
    sucur_Descripcion: '', 
    sucur_Direccion: '', 
    munic_Id: '', 
    sucur_Telefono: '', 
    sucur_UsuarioCreacion: 0,
    sucur_FechaCreacion: new Date(),
    sucur_UsuarioModificacion:  null,
    sucur_FechaModificacion:  null,
    sucur_Estado: null,
    munic_Descripcion: '',
    usuarioCreacion: '',
    usuarioModificacion: '',
 
 
};
  constructor(private service: SucursalServiceService, private router: Router,private messageService: MessageService,private MunicipiosServiceService: MunicipiosServiceService) {}
  deleteProductDialog: boolean = false;
  //Detalle
  sucur_Id: number=0;
  sucur_Descripcion: string = "";
  munic_Id: string = "";
  sucur_Direccion: string = "";
  sucur_Telefono: string = "";
  sucur_UsuarioCreacion: number = 0;
  sucur_FechaCreacion: Date;
  sucur_UsuarioModificacion: number | null;
  sucur_FechaModificacion: Date | null;
  sucur_Estado: boolean | null;
  munic_Descripcion: string = "";
  usuarioCreacion: string = "";
  usuarioModificacion: string = "";

  ngOnInit(): void {
    this.getSucursal();
    this.getMunicipio();
  }
  showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }
  onDropdownChange(event: any): void {
    this.sucursalSeleccionado.munic_Id = event.value;
  
}
onGlobalFilter(event: any): void {
  const searchText = event.target.value.toLowerCase();
  this.sucursal = this.sucursal.filter((sucur: SucursalesViewModel) => {
    return (
      sucur.sucur_Id.toString().toLowerCase().includes(searchText) ||
      sucur.sucur_Descripcion.toLowerCase().includes(searchText) ||
      sucur.sucur_Direccion.toLowerCase().includes(searchText) ||
      sucur.munic_Id.toLowerCase().includes(searchText) ||
      sucur.sucur_Telefono.toLowerCase().includes(searchText) ||
      sucur.munic_Descripcion.toString().toLowerCase().includes(searchText) ||
      sucur.usuarioCreacion.toString().toLowerCase().includes(searchText) ||
      sucur.usuarioModificacion.toString().toLowerCase().includes(searchText) ||
      (sucur.sucur_FechaCreacion && sucur.sucur_FechaCreacion.toString().toLowerCase().includes(searchText)) ||
      (sucur.sucur_UsuarioModificacion && sucur.sucur_UsuarioModificacion.toString().toLowerCase().includes(searchText)) ||
      ((sucur.sucur_FechaModificacion && sucur.sucur_FechaModificacion.toString().toLowerCase().includes(searchText))) ||
      ((sucur.sucur_Estado !== null && sucur.sucur_Estado.toString().toLowerCase().includes(searchText)))
    );
  });
}


getSucursal(): void {
    this.service.getSucursal().subscribe(
      (response: any) => {
        console.log(response);
        this.sucursal = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  clear(): void {
    this.getSucursal();
  }

  dropdownOptions: any[] = []; 
  cancelar(){
    this.Collapse= false;
    this.Detalles = false;
    this.sucursalForm = new FormGroup({
        sucur_Descripcion: new FormControl("",Validators.required),
        munic_Id: new FormControl("",Validators.required),
        sucur_Direccion: new FormControl("", Validators.required),
        sucur_Telefono: new FormControl('0', [Validators.required])
    });
    this.UsuarioId=true;
}

  collapse(){
    this.Collapse= true;
    this.Detalles = false;
}
detalles(codigo) {
  this.Collapse = false;
  this.Detalles = true;
  this.service.getdetalles(codigo).subscribe({
      next: (response: any) => {
          const data = response.data[0]; // Acceder al primer elemento del array
          console.log('Respuesta del servidor:', data);
          this.sucur_Descripcion = data.sucur_Descripcion;
          this.sucur_Telefono = data.sucur_Telefono;
          this.munic_Id = data.munic_Id;
          this.sucur_Telefono = data.sucur_Telefono;
          this.usuarioCreacion = data.usuarioCreacion;
          this.usuarioModificacion = data.usuarioModificacion;
          this.sucur_FechaCreacion = data.sucur_FechaCreacion;
          this.sucur_FechaModificacion = data.sucur_FechaModificacion;
      },
      error: (error) => {
          console.error('Error al obtener detalles:', error);
      }
  });
}

getMunicipio(): void {
  this.MunicipiosServiceService.getMunicipio().subscribe(
    (response: any) => {
      console.log(response);
      this.dropdownOptions = response.data.map((Empleados: any) => {
        return { label: Empleados.munic_Descripcion, value: Empleados.munic_Id };
      });
      console.log(this.dropdownOptions); 
    },
    error => {
      console.log(error);
    }
  );
}






  municipioSeleccionadoId: string = '';

  eliminarcategoria(municipioId: number): void {
      console.log('ID:', municipioId);
      // Almacena el ID del municipio seleccionado
      this.municipioSeleccionadoId = municipioId.toString();
      // Muestra el modal de confirmación
      this.showDeleteConfirmation = true;
  }

  confirmarEliminacion(): void {
    if (this.municipioSeleccionadoId) {
        this.service.eliminarmetodo(parseInt(this.municipioSeleccionadoId)).subscribe(
            (response) => {
                console.log('Municipio eliminado exitosamente', response);
  
                // Añadimos un mensaje de éxito aquí para verificar si se ejecuta
                // this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Municipio eliminado correctamente' });
  
                this.getSucursal();
                this.municipioSeleccionadoId = '';
            },
            (error) => {
              // this.messageService.add({ severity: 'Error', summary: 'Danger Message', detail: 'El Municipio no se eliminado correctamente' });
                this.municipioSeleccionadoId = '';
            }
        );
    } else {
        console.error('ID del municipio seleccionado está vacío');
    }
    this.showDeleteConfirmation = false;
  }
  cancelarEliminacion(): void {
    this.showDeleteConfirmation = false;
    this.municipioSeleccionadoId = '';
  }
    //Funcionan como regex
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
  openModal(tipo: string, categoria?: SucursalesViewModel): void {
    if (tipo === 'nuevo') {
        // Limpiar el objeto impuestoSeleccionado antes de abrir el modal de inserción
        this.sucursalSeleccionado = {
          sucur_Id: 0, 
          sucur_Descripcion: '', 
          sucur_Direccion: '', 
          munic_Id: '', 
          sucur_Telefono: '', 
          sucur_UsuarioCreacion: 0,
          sucur_FechaCreacion: new Date(),
          sucur_UsuarioModificacion:  null,
          sucur_FechaModificacion:  null,
          sucur_Estado: null,
          munic_Descripcion: '',
          usuarioCreacion: '',
          usuarioModificacion: '',
        };
        this.showModal = true;
    } else if (tipo === 'editar') {
        this.sucursalSeleccionado = categoria!;
        this.editModal = true;
    } else if (tipo === 'eliminar') {
        this.deleteModal = true;
    }
  }

 
  closeModal(tipo: string): void {
    if (tipo === 'nuevo') {
      this.showModal = false;
    } else if (tipo === 'editar') {
      this.editModal = false;
    } else if (tipo === 'eliminar') {
      this.deleteModal = false;
    }
  }
  guardarNuevocategoria(): void {
    // Verificar que los campos requeridos no estén vacíos
    if (!this.sucursalSeleccionado.sucur_Descripcion.trim() || !this.sucursalSeleccionado.sucur_Direccion.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor complete todos los campos', life: 3000 });
      return; // Detener la ejecución si falta algún campo requerido
    }
  
    // Continuar con la lógica si los campos requeridos están llenos
    this.service.insertarUsuario(this.sucursalSeleccionado).subscribe(
      (response: any) => {
        console.log('Categoría insertada correctamente:', response);
        // Agregar mensaje de éxito si es necesario
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
        this.getSucursal();
        this.closeModal('nuevo');
      },
      (error) => {
        console.error('Error al insertar la categoría:', error);
        // Mostrar mensaje de error si es necesario
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro insertar', life: 3000 });
      }
    );
  }
  
  guardarCambios(): void {
    // Verificar que los campos requeridos no estén vacíos
    if (!this.sucursalSeleccionado.sucur_Descripcion.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor complete todos los campos', life: 3000 });
      return; // Detener la ejecución si falta algún campo requerido
    }
  
    // Continuar con la lógica si los campos requeridos están llenos
    this.service.actualizarUsuario(this.sucursalSeleccionado).subscribe(
      (response: any) => {
        console.log('Categoría actualizada correctamente:', response);
        // Agregar mensaje de éxito si es necesario
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Editado con Exito', life: 3000 });
        this.getSucursal();
        this.closeModal('editar');
      },
      (error) => {
        console.error('Error al actualizar la categoría:', error);
        // Mostrar mensaje de error si es necesario
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro Editar', life: 3000 });
      }
    );
  }
  

  // editDepartamento(depto: UsuariosViewModel): void {
  //   this.usuarioSeleccionado = depto;
  //   this.editModal = true;
  // }

  // guardarCambios(): void {
  //   this.editModal = false;
  // }

  // deleteDepartamento(depto: UsuariosViewModel): void {
  //   this.usuarioSeleccionado = depto;
  //   this.deleteModal = true;
  // }

  // eliminarDepartamento(): void {
  //   this.deleteModal = false;
  // }
  Fill(codigo) {
    this.service.getdetalles(codigo).subscribe({
        next: (data: Fill) => {
            this.sucursalForm = new FormGroup({
              sucur_Descripcion: new FormControl("",Validators.required),
              munic_Id: new FormControl("",Validators.required),
              sucur_Direccion: new FormControl("", Validators.required),
              sucur_Telefono: new FormControl('0', [Validators.required])
            });
            this.Collapse= true;

            this.Detalles = false;
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
    ToastModule
  ],
  declarations: [SucursalesListadoComponent]
})
export class UsuarioListadoModule {}
