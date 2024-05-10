import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { DepartamentoServiceService } from '../../api/Services/departamento-service.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { EstadosCivilesServiceService } from '../../api/Services/estadosCiviles-service.service';
import { EstadosCivilesViewModel,Fill } from '../../api/Models/EstadosCivilesViewModel';
import { MensajeViewModel } from '../../api/Models/MensajeViewModel';
import { ToastModule } from 'primeng/toast'; 
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-list',
  templateUrl: './listEstado.component.html',
  styleUrls: ['./listEstado.component.css'],
  providers: [MessageService]
})
export class EstadoCivilListadoComponent implements OnInit {
  estado!: EstadosCivilesViewModel[];
  fill: any[] = [];
  EstaCodigo: boolean = true;
  Collapse: boolean = false;
  Detalles: boolean = false;
  municipioForm: FormGroup;
  showModal: boolean = false;
  editModal: boolean = false;
  showDeleteConfirmation: boolean = false;
  MensajeViewModel!: MensajeViewModel[];
  deleteModal: boolean = false;
  estadoSeleccionado: EstadosCivilesViewModel = { 
    estad_Id: '', 
    estad_Descripcion: '', 
    estad_UsuarioCreacion: 0, 
    estad_FechaCreacion: new Date(), 
    estad_UsuarioModificacion: null, 
    estad_FechaModificacion: null, 
    estad_Estado: null, 
    usuarioCreacion: '', 
    usuarioModificacion: '' 
  };

  constructor(private service: EstadosCivilesServiceService, private router: Router,private messageService: MessageService) {}
  deleteProductDialog: boolean = false;
  //Detalle
  Id: String = "";
  Descripcion: String = "";

  UsuarioCreacion: String = "";
  UsuarioModificacion: String = "";
  FechaCreacion: String = "";
  FechaModificacion: String = "";
  ID: String = "";

  ngOnInit(): void {
    this.getEstado();
  }

  onGlobalFilter(event: any): void {
    const searchText = event.target.value.toLowerCase();
    this.estado = this.estado.filter((estado: EstadosCivilesViewModel) => {
      return (
        estado.estad_Id.toString().toLowerCase().includes(searchText) ||
        estado.estad_Descripcion.toLowerCase().includes(searchText) ||
        estado.estad_UsuarioCreacion.toString().toLowerCase().includes(searchText) ||
        (estado.estad_FechaCreacion && estado.estad_FechaCreacion.toString().toLowerCase().includes(searchText)) ||
        (estado.estad_UsuarioModificacion && estado.estad_UsuarioModificacion.toString().toLowerCase().includes(searchText)) ||
        ((estado.estad_FechaModificacion && estado.estad_FechaModificacion.toString().toLowerCase().includes(searchText))) ||
        ((estado.estad_Estado !== null && estado.estad_Estado.toString().toLowerCase().includes(searchText)))
      );
    });
  }
  showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }

  getEstado(): void {
    this.service.getEstado().subscribe(
      (response: any) => {
        console.log(response);
        this.estado = response.data;
      },
      error => {
        console.log(error);
      }
    );
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
          this.Descripcion = data.estad_Descripcion;
          this.UsuarioCreacion = data.usuarioCreacion;
          this.UsuarioModificacion = data.usuarioModificacion;
          this.FechaCreacion = data.munic_FechaCreacion;
          this.FechaModificacion = data.munic_FechaModificacion;
      },
      error: (error) => {
          console.error('Error al obtener detalles:', error);
      }
  });
}
//Cerrar Collapse y reiniciar el form

cancelar(){
  this.Collapse= false;
  this.Detalles = false;
  this.municipioForm = new FormGroup({
  
    Estad_Descripcion: new FormControl("", Validators.required),
    
  });
  this.EstaCodigo=true;
}





  clear(): void {
    this.getEstado();
  }
  civilSeleccionadoId: string = '';

  eliminarcategoria(civilId: number): void {
      console.log('ID:', civilId);
      // Almacena el ID del municipio seleccionado
      this.civilSeleccionadoId = civilId.toString();
      // Muestra el modal de confirmación
      this.showDeleteConfirmation = true;
  }
  confirmarEliminacion(): void {
    if (this.civilSeleccionadoId) {
        this.service.eliminarCivil(parseInt(this.civilSeleccionadoId)).subscribe(
            (response) => {
                console.log('Municipio eliminado exitosamente', response);
  
                // Añadimos un mensaje de éxito aquí para verificar si se ejecuta
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
  
                this.getEstado();
                this.civilSeleccionadoId = '';
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro Eliminar', life: 3000 });
                this.civilSeleccionadoId = '';
            }
        );
    } else {
        console.error('ID del municipio seleccionado está vacío');
    }
    this.showDeleteConfirmation = false;
  }

  cancelarEliminacion(): void {
    this.showDeleteConfirmation = false;
    this.civilSeleccionadoId = '';
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

  openModal(tipo: string, departamento?: EstadosCivilesViewModel): void {
    if (tipo === 'nuevo') {
        // Limpiar el objeto impuestoSeleccionado antes de abrir el modal de inserción
        this.estadoSeleccionado = {
            estad_Id: '',
            estad_Descripcion: '',
            estad_UsuarioCreacion: 0,
            estad_FechaCreacion: new Date(),
            estad_UsuarioModificacion: null,
            estad_FechaModificacion: null,
            usuarioCreacion: '',
            usuarioModificacion: ''
        };
        this.showModal = true;
    } else if (tipo === 'editar') {
        this.estadoSeleccionado = departamento!;
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
    // Verificar que el campo requerido no esté vacío
    if (!this.estadoSeleccionado.estad_Descripcion.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor ingrese la descripción del estado civil', life: 3000 });
      return; // Detener la ejecución si falta el campo requerido
    }
  
    // Continuar con la lógica si el campo requerido está lleno
    this.service.insertarCivil(this.estadoSeleccionado).subscribe(
      (response: any) => {
        console.log('Estado civil insertado correctamente:', response);
        // Agregar mensaje de éxito si es necesario
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
        this.getEstado();
        this.closeModal('nuevo');
      },
      (error) => {
        console.error('Error al insertar el estado civil:', error);
        // Mostrar mensaje de error si es necesario
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro insertar', life: 3000 });
      }
    );
  }
  
   
  guardarCambios(): void {
    // Verificar que el campo requerido no esté vacío
    if (!this.estadoSeleccionado.estad_Descripcion.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor ingrese la descripción del estado civil', life: 3000 });
      return; // Detener la ejecución si falta el campo requerido
    }
  
    // Continuar con la lógica si el campo requerido está lleno
    this.service.actualizarCivil(this.estadoSeleccionado).subscribe(
      (response: any) => {
        console.log('Estado civil actualizado correctamente:', response);
        // Agregar mensaje de éxito si es necesario
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Editado con Exito', life: 3000 });
        this.getEstado();
        this.closeModal('editar');
      },
      (error) => {
        console.error('Error al actualizar el estado civil:', error);
        // Mostrar mensaje de error si es necesario
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro Editar', life: 3000 });
      }
    );
  }
  
  // editDepartamento(depto: EstadosCivilesViewModel): void {
  //   this.estadoSeleccionado = depto;
  //   this.editModal = true;
  // }

  // guardarCambios(): void {
  //   this.editModal = false;
  // }

  // deleteDepartamento(depto: EstadosCivilesViewModel): void {
  //   this.estadoSeleccionado = depto;
  //   this.deleteModal = true;
  // }

  // eliminarDepartamento(): void {
  //   this.deleteModal = false;
  // }
  Fill(codigo) {
    this.service.getFill(codigo).subscribe({
        next: (data: Fill) => {
            this.municipioForm = new FormGroup({
             
              Estad_Descripcion: new FormControl(data.estad_Descripcion, Validators.required),
               
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
  declarations: [EstadoCivilListadoComponent]
})
export class EstaciCivilListadoModule {}