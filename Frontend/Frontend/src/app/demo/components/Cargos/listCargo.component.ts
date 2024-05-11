import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CargosViewModel,Fill } from '../../api/Models/CargosViewModel';
import { DepartamentoServiceService } from '../../api/Services/departamento-service.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CargosServiceService } from '../../api/Services/cargos-service.service';
import { MensajeViewModel } from '../../api/Models/MensajeViewModel';
import { ToastModule } from 'primeng/toast'; 
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-list',
  templateUrl: './listCargo.component.html',
  styleUrls: ['./listCargo.component.css'],
  providers: [MessageService]
})
export class CargosListadoComponent implements OnInit {
  // cargo!: CargosViewModel[];
  cargo: CargosViewModel[] = [];

  staticData = [{}];

  carCodigo: boolean = true;
  fill: any[] = [];
  Collapse: boolean = false;
  Detalles: boolean = false;
  CargoForm: FormGroup;
  showModal: boolean = false;
  editModal: boolean = false;
  showDeleteConfirmation: boolean = false;
  MensajeViewModel!: MensajeViewModel[];
  deleteModal: boolean = false;
   cargoSeleccionado: CargosViewModel = { 
    cargo_Id: '', 
    cargo_Descripcion: '', 
    cargo_UsuarioCreacion: 0, 
    cargo_FechaCreacion: new Date(), 
    cargo_UsuarioModificacion: null, 
    cargo_FechaModificacion: null, 
    cargo_Estado: null, 
    usuarioCreacion: '', 
    usuarioModificacion: '' 

};


  constructor(private service: CargosServiceService, private router: Router,   private messageService: MessageService) {}
  deleteProductDialog: boolean = false;
  //Detalle
  Cargo_Id: String = "";
  Cargo_Descripcion: String = "";
  
  UsuarioCreacion: String = "";
  UsuarioModificacion: String = "";
  FechaCreacion: String = "";
  FechaModificacion: String = "";
  ngOnInit(): void {
    this.getCargo();
  }

onGlobalFilter(event: any): void {
  const searchText = event.target.value.toLowerCase();
  this.cargo = this.cargo.filter((cargo: CargosViewModel) => {
    return (
      cargo.cargo_Id.toString().toLowerCase().includes(searchText) ||
      cargo.cargo_Descripcion.toLowerCase().includes(searchText) ||
      cargo.cargo_UsuarioCreacion.toString().toLowerCase().includes(searchText) ||
      (cargo.cargo_FechaCreacion && cargo.cargo_FechaCreacion.toString().toLowerCase().includes(searchText)) ||
      (cargo.cargo_UsuarioModificacion && cargo.cargo_UsuarioModificacion.toString().toLowerCase().includes(searchText)) ||
      ((cargo.cargo_FechaModificacion && cargo.cargo_FechaModificacion.toString().toLowerCase().includes(searchText))) ||
      ((cargo.cargo_Estado !== null && cargo.cargo_Estado.toString().toLowerCase().includes(searchText)))
    );
  });
}
showToast(severity: string, summary: string, detail: string): void {
  this.messageService.add({ severity: severity, summary: summary, detail: detail });
}


cancelar(){
  this.Collapse= false;
  this.Detalles = false;
  this.CargoForm = new FormGroup({
    Cargo_Id: new FormControl("",Validators.required),
    Cargo_Descripcion: new FormControl("", Validators.required),
    
  });
  this.carCodigo=true;
}

collapse(){
  this.Collapse= true;
  this.Detalles = false;
}

detalles(id){
  this.Collapse= false;

  this.Detalles = true;
  this.service.getFill(id).subscribe({
      next: (data: Fill) => {
         this.Cargo_Descripcion = data.cargo_Descripcion,
         this.UsuarioCreacion = data.usuarioCreacion,
         this.UsuarioModificacion = data.usuarioModificacion
        //  this.FechaCreacion = data.cargo_FechaCreacion,
        //  this.FechaModificacion = data.fechaModificacion
      }
    });
}


  getCargo(): void {
    this.service.getCargo().subscribe(
      (response: any) => {
        console.log(response);
        this.cargo = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  clear(): void {
    this.getCargo();
  }
  cargoSeleccionadoId: string = '';

  eliminarcategoria(municipioId: number): void {
      console.log('ID:', municipioId);
      // Almacena el ID del municipio seleccionado
      this.cargoSeleccionadoId = municipioId.toString();
      // Muestra el modal de confirmación
      this.showDeleteConfirmation = true;
  }

  confirmarEliminacion(): void {
    if (this.cargoSeleccionadoId) {
        this.service.eliminarCargo(parseInt(this.cargoSeleccionadoId)).subscribe(
            (response) => {
                console.log('Municipio eliminado exitosamente', response);
  
                // Añadimos un mensaje de éxito aquí para verificar si se ejecuta
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con Exito', life: 3000 });
  
                this.getCargo();
                this.cargoSeleccionadoId = '';
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro Eliminar', life: 3000 });
                this.cargoSeleccionadoId = '';
            }
        );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro obtener el Id de municipio', life: 3000 });
    }
    this.showDeleteConfirmation = false;
  }

  cancelarEliminacion(): void {
    this.showDeleteConfirmation = false;
    this.cargoSeleccionadoId = '';
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
  openModal(tipo: string, categoria?: CargosViewModel): void {
    if (tipo === 'nuevo') {
        // Limpiar el objeto impuestoSeleccionado antes de abrir el modal de inserción
        this.cargoSeleccionado = {
            cargo_Id: '',
            cargo_Descripcion: '',
            cargo_UsuarioCreacion: 0,
            cargo_FechaCreacion: new Date(),
            cargo_UsuarioModificacion: null,
            cargo_FechaModificacion: null,
            usuarioCreacion: '',
            usuarioModificacion: ''
        };
        this.showModal = true;
    } else if (tipo === 'editar') {
        this.cargoSeleccionado = categoria!;
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
    if (!this.cargoSeleccionado.cargo_Descripcion.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor ingrese la descripción del cargo', life: 3000 });
      return; // Detener la ejecución si falta la descripción
    }
  
    // Continuar con la lógica si los campos requeridos están llenos
    this.service.insertarCargo(this.cargoSeleccionado).subscribe(
      (response: any) => {
        console.log('Cargo insertado correctamente:', response);
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
        this.getCargo();
        this.closeModal('nuevo');
      },
      error => {
        console.error('Error al insertar el Cargo:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro insertar', life: 3000 });
      }
    );
  }
  
  guardarCambios(): void {
    // Verificar que los campos requeridos no estén vacíos
    if (!this.cargoSeleccionado.cargo_Descripcion.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor ingrese la descripción del cargo', life: 3000 });
      return; // Detener la ejecución si falta la descripción
    }
  
    // Continuar con la lógica si los campos requeridos están llenos
    this.service.actualizarCargo(this.cargoSeleccionado).subscribe(
      (response: any) => {
        console.log('Cargo actualizado correctamente:', response);
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Editado con Exito', life: 3000 });
        this.getCargo();
        this.closeModal('editar');
      },
      (error) => {
        console.error('Error al actualizar el Cargo:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro Editar', life: 3000 });
      }
    );
  }
  


  // editDepartamento(depto: CargosViewModel): void {
  //   this.cargoSeleccionado = depto;
  //   this.editModal = true;
  // }

  // guardarCambios(): void {
  //   this.editModal = false;
  // }

  // deleteDepartamento(depto: CargosViewModel): void {
  //   this.cargoSeleccionado = depto;
  //   this.deleteModal = true;
  // }

  // eliminarDepartamento(): void {
  //   this.deleteModal = false;
  // }
  Fill(codigo) {
    this.service.getFill(codigo).subscribe({
        next: (data: Fill) => {
            this.CargoForm = new FormGroup({
              Cargo_Id: new FormControl(data.cargo_Id,Validators.required),
                Cargo_Descripcion: new FormControl(data.cargo_Descripcion, Validators.required),
               
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
    ToastModule // Agrega ToastModule aquí
  ],
  declarations: [CargosListadoComponent]
})
export class CargoListadoModule {}