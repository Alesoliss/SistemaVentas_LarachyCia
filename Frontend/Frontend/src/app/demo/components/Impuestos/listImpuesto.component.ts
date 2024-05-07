import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ImpuestosViewModel } from '../../api/Models/ImpuestosViewModel';
import { ImpuestoServiceService } from '../../api/Services/impuestos-service.service';
import { MensajeViewModel } from '../../api/Models/MensajeViewModel';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-list',
  templateUrl: './listImpuesto.component.html',
  styleUrls: ['./listImpuesto.component.css'],
  providers: [MessageService]
})
export class ImpuestoListadoComponent implements OnInit {
  impuesto!: ImpuestosViewModel[];
  showModal: boolean = false;
  editModal: boolean = false;
  showDeleteConfirmation: boolean = false;
  MensajeViewModel!: MensajeViewModel[];
  deleteModal: boolean = false;
  impuestoSeleccionado: ImpuestosViewModel = { 
    impue_Id: 0, 
    impue_Descripcion: 0, 
    impue_UsuarioCreacion: 0, 
    impue_FechaCreacion: new Date(), 
    impue_UsuarioModificacion: null, 
    impue_FechaModificacion: null, 
    impue_Estado: null, 
    usuarioCreacion: '', 
    usuarioModificacion: '' 
  };

  constructor(private service: ImpuestoServiceService, private router: Router,private messageService: MessageService) {}

  ngOnInit(): void {
    this.getImpuesto();
  }

  onGlobalFilter(event: any): void {
    const searchText = event.target.value.toLowerCase();
    this.impuesto = this.impuesto.filter((impuesto: ImpuestosViewModel) => {
      return (
        impuesto.impue_Id.toString().toLowerCase().includes(searchText) ||
        impuesto.impue_Descripcion.toString().toLowerCase().includes(searchText) ||
        impuesto.impue_UsuarioCreacion.toString().toLowerCase().includes(searchText) ||
        (impuesto.impue_FechaCreacion && impuesto.impue_FechaCreacion.toString().toLowerCase().includes(searchText)) ||
        (impuesto.impue_UsuarioModificacion && impuesto.impue_UsuarioModificacion.toString().toLowerCase().includes(searchText)) ||
        ((impuesto.impue_FechaModificacion && impuesto.impue_FechaModificacion.toString().toLowerCase().includes(searchText))) ||
        ((impuesto.impue_Estado !== null && impuesto.impue_Estado.toString().toLowerCase().includes(searchText)))
      );
    });
  }
  showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }
  getImpuesto(): void {
    this.service.getImpuesto().subscribe(
      (response: any) => {
        console.log(response);
        this.impuesto = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  clear(): void {
    this.getImpuesto();
  }

  
  impuestoeleccionadoId: string = '';

  eliminarcategoria(municipioId: number): void {
      console.log('ID:', municipioId);
      // Almacena el ID del municipio seleccionado
      this.impuestoeleccionadoId = municipioId.toString();
      // Muestra el modal de confirmación
      this.showDeleteConfirmation = true;
  }

  confirmarEliminacion(): void {
    if (this.impuestoeleccionadoId) {
        this.service.eliminarImpuesto(parseInt(this.impuestoeleccionadoId)).subscribe(
            (response) => {
                console.log('impuesto eliminado exitosamente', response);
  
                // Añadimos un mensaje de éxito aquí para verificar si se ejecuta
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con Exito', life: 3000 });
  
                this.getImpuesto();
                this.impuestoeleccionadoId = '';
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro Eliminar', life: 3000 });
                this.impuestoeleccionadoId = '';
            }
        );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro obtener el Id de municipio', life: 3000 });
    }
    this.showDeleteConfirmation = false;
  }
  cancelarEliminacion(): void {
    this.showDeleteConfirmation = false;
    this.impuestoeleccionadoId = '';
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


  openModal(tipo: string, categoria?: ImpuestosViewModel): void {
    if (tipo === 'nuevo') {
        // Limpiar el objeto impuestoSeleccionado antes de abrir el modal de inserción
        this.impuestoSeleccionado = {
            impue_Id: 0,
            impue_Descripcion: 0,
            impue_UsuarioCreacion: 0,
            impue_FechaCreacion: new Date(),
            impue_UsuarioModificacion: null,
            impue_FechaModificacion: null,
            usuarioCreacion: '',
            usuarioModificacion: ''
        };
        this.showModal = true;
    } else if (tipo === 'editar') {
        this.impuestoSeleccionado = categoria!;
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
    if (!this.impuestoSeleccionado.impue_Descripcion || isNaN(this.impuestoSeleccionado.impue_Descripcion)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor ingrese un número válido para la descripción del impuesto', life: 3000 });
      return; // Detener la ejecución si el campo requerido está vacío o no es un número
    }
  
    // Continuar con la lógica si el campo requerido es válido
    this.service.insertarImpuesto(this.impuestoSeleccionado).subscribe(
      (response: any) => {
        console.log('Impuesto insertado correctamente:', response);
        // Agregar mensaje de éxito si es necesario
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
        this.getImpuesto();
        this.closeModal('nuevo');
      },
      (error) => {
        console.error('Error al insertar el impuesto:', error);
        // Mostrar mensaje de error si es necesario
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro insertar', life: 3000 });
      }
    );
  }
  
  
  guardarCambios(): void {
    // Verificar que el campo requerido no esté vacío ni sea NaN
    if (!this.impuestoSeleccionado.impue_Descripcion || isNaN(this.impuestoSeleccionado.impue_Descripcion)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor ingrese un número válido para la descripción del impuesto', life: 3000 });
      return; // Detener la ejecución si el campo requerido está vacío o no es un número válido
    }
  
    // Continuar con la lógica si el campo requerido es válido
    this.service.actualizarImpuesto(this.impuestoSeleccionado).subscribe(
      (response: any) => {
        console.log('Impuesto actualizado correctamente:', response);
        // Agregar mensaje de éxito si es necesario
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Editado con Exito', life: 3000 });
        this.getImpuesto();
        this.closeModal('editar');
      },
      (error) => {
        console.error('Error al actualizar el impuesto:', error);
        // Mostrar mensaje de error si es necesario
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro Editar', life: 3000 });
      }
    );
  }
  
  // editDepartamento(depto: ImpuestosViewModel): void {
  //   this.impuestoSeleccionado = depto;
  //   this.editModal = true;
  // }

  // guardarCambios(): void {
  //   this.editModal = false;
  // }

  // deleteDepartamento(depto: ImpuestosViewModel): void {
  //   this.impuestoSeleccionado = depto;
  //   this.deleteModal = true;
  // }

  // eliminarDepartamento(): void {
  //   this.deleteModal = false;
  // }
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
  declarations: [ImpuestoListadoComponent]
})
export class ImpuestoListadoModule {}