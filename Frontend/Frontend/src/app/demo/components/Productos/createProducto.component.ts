import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosViewModel } from '../../api/Models/ProductoViewModel';
import { DepartamentoServiceService } from '../../api/Services/departamento-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ProductosServiceService } from '../../api/Services/productos-service.service';
import { MensajeViewModel } from '../../api/Models/MensajeViewModel';
import { ToastModule } from 'primeng/toast'; 


@Component({
  selector: 'app-list',
  templateUrl: './createProducto.component.html'
  // styleUrls: ['./listProductos.component.css']
})
export class ProductoCreateComponent implements OnInit {
  Productos!: ProductosViewModel[];
  showModal: boolean = false;
  editModal: boolean = false;
  showDeleteConfirmation: boolean = false;
  MensajeViewModel!: MensajeViewModel[];
  deleteModal: boolean = false;
   productoSeleccionado: ProductosViewModel = { 
    Produ_Id: 0, 
    Produ_Descripcion: '', 
    Produ_Existencia: '', 
    Produ_PrecioCompra: '', 
    Produ_PrecioVenta: '', 
    Impue_Id: 0,
    Unida_Id: 0,
    Prove_Id: 0,
    Sucur_Id: 0,
    Categ_Id: 0,
    Produ_UsuarioCreacion: 0,
    Produ_FechaCreacion: new Date(),
    Produ_UsuarioModificacion:  null,
    Produ_FechaModificacion:  null,
    Produ_Estado: true,
    Produ_ImagenUrl: '',
    Unida_Descripcion: '',
    Prove_Marca: '',
    Impue_Descripcion: '',
    UsuarioCreacion: '',
    UsuarioModificacion: '',
    Categ_Descripcion: '',
    Sucur_Descripcion: '',
    Vende_Id: 0,
    Vende_Cantidad: '',
    Vende_UsuarioCreacion: 0,
    Vende_FechaCreacion: new Date(),
    Vende_UsuarioModificacion:  null,
    Vende_FechaModificacion:  null,
    Vende_Estado:  null,
    cliente: '',
};
  constructor(private service: ProductosServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getCargo();
  }

onGlobalFilter(event: any): void {
  const searchText = event.target.value.toLowerCase();
  this.Productos = this.Productos.filter((Prod: ProductosViewModel) => {
    return (
      Prod.Produ_Id.toString().toLowerCase().includes(searchText) ||
      Prod.Produ_Descripcion.toLowerCase().includes(searchText) ||
      Prod.Produ_Existencia.toLowerCase().includes(searchText) ||
      Prod.Produ_PrecioCompra.toLowerCase().includes(searchText) ||
      Prod.Produ_PrecioVenta.toLowerCase().includes(searchText) ||
      Prod.Impue_Id.toString().toLowerCase().includes(searchText) ||
      Prod.Unida_Id.toString().toLowerCase().includes(searchText) ||
      Prod.Prove_Id.toString().toLowerCase().includes(searchText) ||
      Prod.Sucur_Id.toString().toLowerCase().includes(searchText) ||
      Prod.Categ_Id.toString().toLowerCase().includes(searchText) ||
      Prod.UsuarioCreacion.toString().toLowerCase().includes(searchText) ||
      Prod.UsuarioModificacion.toString().toLowerCase().includes(searchText) ||
      (Prod.Produ_FechaCreacion && Prod.Produ_FechaCreacion.toString().toLowerCase().includes(searchText)) ||
      (Prod.Produ_UsuarioModificacion && Prod.Produ_UsuarioModificacion.toString().toLowerCase().includes(searchText)) ||
      ((Prod.Produ_FechaModificacion && Prod.Produ_FechaModificacion.toString().toLowerCase().includes(searchText))) ||
      ((Prod.Produ_Estado !== null && Prod.Produ_Estado.toString().toLowerCase().includes(searchText)))
    );
  });
}


  getCargo(): void {
    this.service.getCargo().subscribe(
      (response: any) => {
        console.log(response);
        this.Productos = response.data;
      },
      error => {
        console.log(error);
      }
    );
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
        this.service.eliminarProducto(parseInt(this.metodoSeleccionadoId)).subscribe(
            (response) => {
                console.log('Municipio eliminado exitosamente', response);
  
                // Añadimos un mensaje de éxito aquí para verificar si se ejecuta
                // this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Municipio eliminado correctamente' });
  
                this.getCargo();
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

 
  openModal(tipo: string, categoria?: ProductosViewModel): void {
    if (tipo === 'nuevo') {
        // Limpiar el objeto impuestoSeleccionado antes de abrir el modal de inserción
        this.productoSeleccionado = {
          Produ_Id: 0, 
          Produ_Descripcion: '', 
          Produ_Existencia: '', 
          Produ_PrecioCompra: '', 
          Produ_PrecioVenta: '', 
          Impue_Id: 0,
          Unida_Id: 0,
          Prove_Id: 0,
          Sucur_Id: 0,
          Categ_Id: 0,
          Produ_UsuarioCreacion: 1,
          Produ_FechaCreacion: new Date(),
          Produ_UsuarioModificacion:  null,
          Produ_FechaModificacion:  null,
          Produ_Estado: true,
          Produ_ImagenUrl: '',
          Unida_Descripcion: '',
          Prove_Marca: '',
          Impue_Descripcion: '',
          UsuarioCreacion: '',
          UsuarioModificacion: '',
          Categ_Descripcion: '',
          Sucur_Descripcion: '',
          Vende_Id: 0,
          Vende_Cantidad: '',
          Vende_UsuarioCreacion: 0,
          Vende_FechaCreacion: new Date(),
          Vende_UsuarioModificacion:  null,
          Vende_FechaModificacion:  null,
          Vende_Estado:  null,
          cliente: '',
        };
        this.showModal = true;
    } else if (tipo === 'editar') {
        this.productoSeleccionado = categoria!;
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
  guardarNuevoEncabezado(): void {
    if (this.productoSeleccionado.Sucur_Id === 0 ) {
      // this.showToast('error', 'Error Message', 'Por favor complete todos los campos obligatorios');
      return; 
    }
  
    console.log('Datos a enviar al servidor:', this.productoSeleccionado);
  
    this.service.insertarProductos(this.productoSeleccionado).subscribe(
      (response: any) => {
        console.log('Municipio insertado correctamente:', response);
  
        // this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Venta insertado correctamente' });
  
        this.getCargo();
        this.closeModal('nuevo');
      },
      error => {
        console.error('Error al insertar el encabezado:', error);
        // this.showToast('error', 'Error Message', 'Error al insertar el encabezado');
  
      }
    );
  }
  
   guardarCambios(): void {
    this.service.actualizarProducto(this.productoSeleccionado).subscribe(
      (response) => {
        console.log('Municipio actualizado correctamente:', response);
        // this.showToast('success', 'Success Message', 'Municipio actualizado correctamente');
        this.getCargo();
        this.closeModal('editar');
      },
      (error) => {
        console.error('Error al actualizar el municipio:', error);
        // this.showToast('error', 'Error Message', 'Error al actualizar el municipio');
      }
    );
  }
  

  clear(): void {
    this.getCargo();
   }

  // openModal(): void {
  //   this.showModal = true;
  // }

  // closeModal(): void {
  //   this.showModal = false;
  // }

  // editDepartamento(depto: ProductosViewModel): void {
  //   this.EmpleadoSeleccionado = depto;
  //   this.editModal = true;
  // }

  // guardarCambios(): void {
  //   this.editModal = false;
  // }

  // deleteDepartamento(depto: ProductosViewModel): void {
  //   this.EmpleadoSeleccionado = depto;
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
    DialogModule
  ],
  declarations: [ProductoCreateComponent]
})
export class ProductosListadoModule {}
