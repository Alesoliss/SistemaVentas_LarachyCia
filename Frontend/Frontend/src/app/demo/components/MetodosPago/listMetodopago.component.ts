import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MetodosPagoViewModel,Fill } from '../../api/Models/MetodosPagoViewModel';
import { MetodopagoServiceService } from '../../api/Services/metodosPago-service.service';
import { MensajeViewModel } from '../../api/Models/MensajeViewModel';
import { ToastModule } from 'primeng/toast'; 
@Component({
  selector: 'app-list',
  templateUrl: './listMetodopago.component.html',
  styleUrls: ['./listMetodopago.component.css']
})

export class MetodoPagoListadoComponent implements OnInit {
  impuesto!: MetodosPagoViewModel[];
  staticData = [{}];

  carCodigo: boolean = true;
  fill: any[] = [];
  Collapse: boolean = false;
  Detalles: boolean = false;
  MetodoForm: FormGroup;
  showModal: boolean = false;
  editModal: boolean = false;
  showDeleteConfirmation: boolean = false;
  MensajeViewModel!: MensajeViewModel[];
  deleteModal: boolean = false;
  impuestoSeleccionado: MetodosPagoViewModel = { 
    mtPag_Id: 0, 
    mtPag_Descripcion: '', 
    mtPag_UsuarioCreacion: 0, 
    mtPag_FechaCreacion: new Date(), 
    mtPag_UsuarioModificacion: null, 
    mtPag_Estado: null, 
    mtPag_FechaModificacion: null, 
    usuarioCreacion: '', 
    usuarioModificacion: '' 
  };

  constructor(private service: MetodopagoServiceService, private router: Router) {}

//Detalle
mtPag_Id: String = "";
mtPag_Descripcion: String = "";

// usuarioCreacion: String = "";
// usuarioModificacion: String = "";
// FechaCreacion: String = "";
// FechaModificacion: String = "";
  ngOnInit(): void {
    this.getMetodoPago();
  }

  onGlobalFilter(event: any): void {
    const searchText = event.target.value.toLowerCase();
    this.impuesto = this.impuesto.filter((impuesto: MetodosPagoViewModel) => {
      return (
        impuesto.mtPag_Id.toString().toLowerCase().includes(searchText) ||
        impuesto.mtPag_Descripcion.toLowerCase().includes(searchText) ||
        impuesto.mtPag_UsuarioCreacion.toString().toLowerCase().includes(searchText) ||
        (impuesto.mtPag_FechaCreacion && impuesto.mtPag_FechaCreacion.toString().toLowerCase().includes(searchText)) ||
        (impuesto.mtPag_UsuarioModificacion && impuesto.mtPag_UsuarioModificacion.toString().toLowerCase().includes(searchText)) ||
        ((impuesto.mtPag_FechaModificacion && impuesto.mtPag_FechaModificacion.toString().toLowerCase().includes(searchText))) ||
        ((impuesto.mtPag_Estado !== null && impuesto.mtPag_Estado.toString().toLowerCase().includes(searchText)))
      );
    });
  }

  getMetodoPago(): void {
    this.service.getMetodoPago().subscribe(
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
    this.getMetodoPago();
  }
    
cancelar(){
  this.Collapse= false;
  this.Detalles = false;
  this.MetodoForm = new FormGroup({
    MtPag_Descripcion: new FormControl("", Validators.required),
    
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
    this.service.getDetalles(id).subscribe({
        next: (data: Fill) => {
           this.mtPag_Descripcion = data.mtPag_Descripcion
          
        }
      });
  }
  
  metodoSeleccionadoId: string = '';

  eliminarcategoria(municipioId: number): void {
      console.log('ID:', municipioId);
      // Almacena el ID del municipio seleccionado
      this.metodoSeleccionadoId = municipioId.toString();
      // Muestra el modal de confirmación
      this.showDeleteConfirmation = true;
  }

  confirmarEliminacion(): void {
    if (this.metodoSeleccionadoId) {
        this.service.eliminarmetodo(parseInt(this.metodoSeleccionadoId)).subscribe(
            (response) => {
                console.log('Municipio eliminado exitosamente', response);
  
                // Añadimos un mensaje de éxito aquí para verificar si se ejecuta
                // this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Municipio eliminado correctamente' });
  
                this.getMetodoPago();
                this.metodoSeleccionadoId = '';
            },
            (error) => {
              // this.messageService.add({ severity: 'Error', summary: 'Danger Message', detail: 'El Municipio no se eliminado correctamente' });
                this.metodoSeleccionadoId = '';
            }
        );
    } else {
        console.error('ID del municipio seleccionado está vacío');
    }
    this.showDeleteConfirmation = false;
  }
  cancelarEliminacion(): void {
    this.showDeleteConfirmation = false;
    this.metodoSeleccionadoId = '';
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

 
  openModal(tipo: string, categoria?: MetodosPagoViewModel): void {
    if (tipo === 'nuevo') {
        // Limpiar el objeto impuestoSeleccionado antes de abrir el modal de inserción
        this.impuestoSeleccionado = {
            mtPag_Id: 0,
            mtPag_Descripcion: '',
            mtPag_UsuarioCreacion: 0,
            mtPag_FechaCreacion: new Date(),
            mtPag_UsuarioModificacion: null,
            mtPag_FechaModificacion: null,
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
    this.service.insertarmetodo(this.impuestoSeleccionado).subscribe(
       (response: any) => {
        console.log('Municipio insertado correctamente:', response);
  
        // this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Municipio insertado correctamente' });
  
         this.getMetodoPago();
        this.closeModal('nuevo');
      },
      error => {
        console.error('Error al insertar el municipio:', error);
        // this.showToast('error', 'Error Message', 'Error al insertar el municipio');
  
       }
     );
   }
   guardarCambios(): void {
    this.service.actualizarmetodo(this.impuestoSeleccionado).subscribe(
      (response) => {
        console.log('Municipio actualizado correctamente:', response);
        // this.showToast('success', 'Success Message', 'Municipio actualizado correctamente');
        this.getMetodoPago();
        this.closeModal('editar');
      },
      (error) => {
        console.error('Error al actualizar el municipio:', error);
        // this.showToast('error', 'Error Message', 'Error al actualizar el municipio');
      }
    );
  }
  // editDepartamento(depto: MetodosPagoViewModel): void {
  //   this.impuestoSeleccionado = depto;
  //   this.editModal = true;
  // }

  // guardarCambios(): void {
  //   this.editModal = false;
  // }

  // deleteDepartamento(depto: MetodosPagoViewModel): void {
  //   this.impuestoSeleccionado = depto;
  //   this.deleteModal = true;
  // }

  // eliminarDepartamento(): void {
  //   this.deleteModal = false;
  // }

  Fill(codigo) {
    this.service.getDetalles(codigo).subscribe({
        next: (data: Fill) => {
            this.MetodoForm = new FormGroup({
              Unida_Id: new FormControl(data.mtPag_Id,Validators.required),
              mtPag_Descripcion: new FormControl(data.mtPag_Descripcion, Validators.required),
               
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
    DialogModule
  ],
  declarations: [MetodoPagoListadoComponent]
})
export class MetodoPagoListadoModule {}