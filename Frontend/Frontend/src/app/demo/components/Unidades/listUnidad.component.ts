import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { UnidadesViewModel } from '../../api/Models/UnidadesViewModel';
import { UnidadServiceService } from '../../api/Services/unidades-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MensajeViewModel } from '../../api/Models/MensajeViewModel';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-list',
  templateUrl: './listUnidad.component.html',
  styleUrls: ['./listUnidad.component.css'],
  providers: [MessageService]
})
export class UnidadesListadoComponent implements OnInit {
  unidades: UnidadesViewModel[] = [];
  showModal: boolean = false;
  editModal: boolean = false;
  showDeleteConfirmation: boolean = false;
  MensajeViewModel!: MensajeViewModel[];
  deleteModal: boolean = false;
  unidadSeleccionada: UnidadesViewModel = { 
    unida_Id: 0, 
    unida_Descripcion: '', 
    unida_UsuarioCreacion: 0, 
    unida_FechaCreacion: new Date(), 
    unida_UsuarioModificacion: null, 
    unida_FechaModificacion: null, 
    unida_Estado: null, 
    usuarioCreacion: '', 
    usuarioModificacion: '' 
};
  
constructor(private service: UnidadServiceService, private router: Router,private messageService: MessageService) {}

  ngOnInit(): void {
    this.getUnidades();
  }

  onGlobalFilter(event: any): void {
    const searchText = event.target.value.toLowerCase();
    this.unidades = this.unidades.filter((unidad: UnidadesViewModel) => {
      return (
        unidad.unida_Id.toString().toLowerCase().includes(searchText) ||
        unidad.unida_Descripcion.toLowerCase().includes(searchText)
      );
    });
  }

  showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }
  getUnidades(): void {
    this.service.getUnidades().subscribe(
      (response: any) => {
        console.log(response);
        this.unidades = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  clear(): void {
    this.getUnidades(); // Recargar las unidades originales
  }
  
  UnidadeseleccionadoId: string = '';

  eliminarcategoria(unidadesId: number): void {
      console.log('ID:', unidadesId);
      // Almacena el ID del municipio seleccionado
      this.UnidadeseleccionadoId = unidadesId.toString();
      // Muestra el modal de confirmación
      this.showDeleteConfirmation = true;
  }
  confirmarEliminacion(): void {
    if (this.UnidadeseleccionadoId) {
        this.service.eliminarmetodo(parseInt(this.UnidadeseleccionadoId)).subscribe(
            (response) => {
                console.log('impuesto eliminado exitosamente', response);
  
                // Añadimos un mensaje de éxito aquí para verificar si se ejecuta
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con Exito', life: 3000 });
  
                this.getUnidades();
                this.UnidadeseleccionadoId = '';
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro Eliminar', life: 3000 });
                this.UnidadeseleccionadoId = '';
            }
        );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro obtener el Id de municipio', life: 3000 });
    }
    this.showDeleteConfirmation = false;
  }
  cancelarEliminacion(): void {
    this.showDeleteConfirmation = false;
    this.UnidadeseleccionadoId = '';
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

  openModal(tipo: string, categoria?: UnidadesViewModel): void {
    if (tipo === 'nuevo') {
        // Limpiar el objeto impuestoSeleccionado antes de abrir el modal de inserción
        this.unidadSeleccionada = {
            unida_Id: 0,
            unida_Descripcion: '',
            unida_UsuarioCreacion: 0,
            unida_FechaCreacion: new Date(),
            unida_UsuarioModificacion: null,
            unida_FechaModificacion: null,
            usuarioCreacion: '',
            usuarioModificacion: ''
        };
        this.showModal = true;
    } else if (tipo === 'editar') {
        this.unidadSeleccionada = categoria!;
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
    if (!this.unidadSeleccionada.unida_Descripcion.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor ingrese la descripción de las Unidades', life: 3000 });
      return; // Detener la ejecución si falta el campo requerido
    }
  
    // Continuar con la lógica si el campo requerido está lleno
    this.service.insertarmetodo(this.unidadSeleccionada).subscribe(
      (response: any) => {
        console.log('Estado civil insertado correctamente:', response);
        // Agregar mensaje de éxito si es necesario
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
        this.getUnidades();
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
    if (!this.unidadSeleccionada.unida_Descripcion.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor ingrese la descripción de la Unidades', life: 3000 });
      return; // Detener la ejecución si falta el campo requerido
    }
  
    // Continuar con la lógica si el campo requerido está lleno
    this.service.actualizarmetodo(this.unidadSeleccionada).subscribe(
      (response: any) => {
        console.log('Unidades actualizado correctamente:', response);
        // Agregar mensaje de éxito si es necesario
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Editado con Exito', life: 3000 });
        this.getUnidades();
        this.closeModal('editar');
      },
      (error) => {
        console.error('Error al actualizar la Unidades:', error);
        // Mostrar mensaje de error si es necesario
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro Editar', life: 3000 });
      }
    );
  }
  // editUnidad(unidad: UnidadesViewModel): void {
  //   this.unidadSeleccionada = unidad;
  //   this.editModal = true;
  // }

  // guardarCambios(): void {
  //   this.editModal = false;
  // }

  // deleteUnidad(unidad: UnidadesViewModel): void {
  //   this.unidadSeleccionada = unidad;
  //   this.deleteModal = true;
  // }

  // eliminarUnidad(): void {
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
  declarations: [UnidadesListadoComponent]
})
export class UnidadesListadoModule {}