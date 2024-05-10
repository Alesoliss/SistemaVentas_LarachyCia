import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { DepartamentosViewModel,Fill } from '../../api/Models/DepartamentosViewModel';
import { DepartamentoServiceService } from '../../api/Services/departamento-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MensajeViewModel } from '../../api/Models/MensajeViewModel';
import { ToastModule } from 'primeng/toast'; 
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [MessageService]

})
export class DepartamentosListadoComponent implements OnInit {
  departamento!: DepartamentosViewModel[];
  showModal: boolean = false;
  editModal: boolean = false;
  showDeleteConfirmation: boolean = false;
  MensajeViewModel!: MensajeViewModel[];
  deleteModal: boolean = false;
  departamentoSeleccionado: DepartamentosViewModel = { 
    depar_Id: '', 
    depar_Descripcion: '', 
    depar_UsuarioCreacion: 0, 
    depar_FechaCreacion: new Date(), 
    depar_UsuarioModificacion: null, 
    depar_FechaModificacion: null, 
    depar_Estado: null, 
    usuarioCreacion: '', 
    usuarioModificacion: '' 
};
  constructor(private service: DepartamentoServiceService, private router: Router,private messageService: MessageService) {}

  ngOnInit(): void {
    this.getDepartamentos();
  }

  onGlobalFilter(event: any): void {
    const searchText = event.target.value.toLowerCase();
    this.departamento = this.departamento.filter((depto: DepartamentosViewModel) => {
      return (
        depto.depar_Id.toLowerCase().includes(searchText) ||
        depto.depar_Descripcion.toLowerCase().includes(searchText)
      );
    });
  }
  showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }
  getDepartamentos(): void {
    this.service.getDepartamento().subscribe(
      (response: any) => {
        console.log(response);
        this.departamento = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }
  tabla: string = "";
  detalless: string = "collapse";
  edit: string = "collapse";

  depar_Id: string= '';
  depar_Descripcion: string = ''; 
  depar_UsuarioCreacion: string= ''; 
  depar_FechaCreacion:  Date = null; 
  depar_UsuarioModificacion: null; 
  depar_FechaModificacion: string = ''; 
  depar_Estado: null;
  usuarioCreacion: string =''; 
  usuarioModificacion: string = ''; 

  detalles(codigo){
    this.tabla = "collapse";
    this.detalless = "";
    this.service.getDetalles(codigo).subscribe({
        next: (data: Fill) => {
          this.depar_Id = data.depar_Id;
          this.depar_Descripcion = data.depar_Descripcion;
          this.usuarioCreacion = data.depar_UsuarioCreacion;
          this.depar_FechaCreacion = data.depar_FechaCreacion;
          this.usuarioModificacion = data.depar_UsuarioModificacion;
          this.depar_FechaModificacion = data.depar_FechaModificacion;
        }
      });
  }

  volver(){
    this.tabla = "";
    this.detalless = "collapse";
  }



  clear(): void {
    this.getDepartamentos(); // Recargar los departamentos originales
  }
  deparSeleccionadoId: string = '';

  eliminarcategoria(departamentoId: string): void {
      console.log('ID:', departamentoId);
      // Almacena el ID del municipio seleccionado
      this.deparSeleccionadoId = departamentoId.toString();
      // Muestra el modal de confirmación
      this.showDeleteConfirmation = true;
  }

  
  confirmarEliminacion(): void {
    if (this.deparSeleccionadoId) {
        this.service.eliminardepartamento(parseInt(this.deparSeleccionadoId)).subscribe(
            (response) => {
                console.log('Municipio eliminado exitosamente', response);
  
                // Añadimos un mensaje de éxito aquí para verificar si se ejecuta
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con Exito', life: 3000 });
  
  
                this.getDepartamentos();
                this.deparSeleccionadoId = '';
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro Eliminar', life: 3000 });
                this.deparSeleccionadoId = '';
            }
        );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro obtener el Id del Departamento', life: 3000 });
    }
    this.showDeleteConfirmation = false;
  }

  cancelarEliminacion(): void {
    this.showDeleteConfirmation = false;
    this.deparSeleccionadoId = '';
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


  openModal(tipo: string, departamento?: DepartamentosViewModel): void {
    if (tipo === 'nuevo') {
        // Limpiar el objeto impuestoSeleccionado antes de abrir el modal de inserción
        this.departamentoSeleccionado = {
            depar_Id: '',
            depar_Descripcion: '',
            depar_UsuarioCreacion: 0,
            depar_FechaCreacion: new Date(),
            depar_UsuarioModificacion: null,
            depar_FechaModificacion: null,
            usuarioCreacion: '',
            usuarioModificacion: ''
        };
        this.showModal = true;
    } else if (tipo === 'editar') {
        this.departamentoSeleccionado = departamento!;
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

  
  guardarNuevodepar(): void {
    // Verificar que los campos requeridos no estén vacíos
    if (!this.departamentoSeleccionado.depar_Descripcion.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor ingrese el nombre del departamento', life: 3000 });
      return; // Detener la ejecución si falta el nombre del departamento
    }
  
    // Continuar con la lógica si los campos requeridos están llenos
    this.service.insertardepartamento(this.departamentoSeleccionado).subscribe(
      (response: any) => {
        console.log('Municipio insertado correctamente:', response);
        // Agregar mensaje de éxito si es necesario
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
        this.getDepartamentos();
        this.closeModal('nuevo');
      },
      (error) => {
        console.error('Error al insertar el municipio:', error);
        // Mostrar mensaje de error si es necesario
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro insertar', life: 3000 });
      }
    );
  }
  
  guardarCambios(): void {
    // Verificar que los campos requeridos no estén vacíos
    if (!this.departamentoSeleccionado.depar_Descripcion.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor ingrese el nombre del departamento', life: 3000 });
      return; // Detener la ejecución si falta el nombre del departamento
    }
  
    // Continuar con la lógica si los campos requeridos están llenos
    this.service.actualizardepartamento(this.departamentoSeleccionado).subscribe(
      (response: any) => {
        console.log('Departamento actualizado correctamente:', response);
        // Agregar mensaje de éxito si es necesario
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Editado con Exito', life: 3000 });
        this.getDepartamentos();
        this.closeModal('editar');
      },
      (error) => {
        console.error('Error al actualizar el departamento:', error);
        // Mostrar mensaje de error si es necesario
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro Editar', life: 3000 });
      }
    );
  }
  

  // editDepartamento(depto: DepartamentosViewModel): void {
  //   this.departamentoSeleccionado = depto;
  //   this.editModal = true;
  // }

  // guardarCambios(): void {
  //   // Lógica para guardar los cambios en el departamento
  //   this.editModal = false;
  // }

  // deleteDepartamento(depto: DepartamentosViewModel): void {
  //   // Lógica para eliminar el departamento
  //   this.departamentoSeleccionado = depto;
  //   this.deleteModal = true;
  // }

  // eliminarDepartamento(): void {
  //   // Lógica para confirmar y eliminar el departamento
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
  declarations: [DepartamentosListadoComponent]
})
export class DepartamentosListadoModule {}