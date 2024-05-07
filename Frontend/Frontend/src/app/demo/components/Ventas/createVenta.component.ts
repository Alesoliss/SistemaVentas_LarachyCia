import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { VentasEncabezadoViewModel } from '../../api/Models/VentasEncabezadoViewModel';
import { ventasEncabezadoServiceService } from '../../api/Services/ventasEncabezado-service';
 import { DepartamentoServiceService } from '../../api/Services/departamento-service.service';
 import { Message, MessageService } from 'primeng/api';
 import { ToastModule } from 'primeng/toast'; 
@Component({
  selector: 'app-list',
  templateUrl: './createVenta.component.html',
//   styleUrls: ['./createVenta.component.css'],
  providers: [MessageService]
})

export class ventaCreateComponent implements OnInit {
  msgs: Message[] = [];

showSuccessViaMessages() {
  this.msgs = [];
  this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Message sent' });
}
  departamento!: VentasEncabezadoViewModel[];

  showModal: boolean = false;
  editModal: boolean = false;
  showDeleteConfirmation: boolean = false;

  deleteModal: boolean = false;
  ventaSeleccionado: VentasEncabezadoViewModel = { 
    // Encabezado
    venen_Id: 0,
    sucur_Id: 0,
    venen_DireccionEnvio: '',
    venen_FechaPedido: new Date(),
    venen_UsuarioCreacion: 0,
    venen_FechaCreacion: new Date(),
    venen_UsuarioModificacion: null,
    venen_FechaModificacion: null,
    venen_Estado: null,
    mtPag_Id: 0,
    venen_NroTarjeta: '',
    emple_Id: 0,
    empleado: '',
    mtPag_Descripcion: '',

    // Detalle
    vende_Id: 0,

    produ_Id: 0,
    vende_Cantidad: 0,

    // Productos
    produ_Descripcion: '',
    produ_Existencia: 0,
    unida_Id: 0,
    produ_PrecioCompra: 0,
    produ_PrecioVenta: 0,
    impue_Id: 0,
    categ_Id: 0,
    prove_Id: 0,
    produ_UsuarioCreacion: 0,
    produ_FechaCreacion: new Date(),
    produ_UsuarioModificacion: null,
    produ_FechaModificacion: null,
    produ_Estado: null,
    produ_ImagenUrl: '',
    unida_Descripcion: '',
    prove_Marca: '',
    impue_Descripcion: 0,
    usuarioCreacion: '',
    usuarioModificacion: '',
    categ_Descripcion: '',
    sucur_Descripcion: '',
    cliente: '',

    // Cliente
    clien_Id: 0,
    clien_PrimerNombre: '',
    clien_SegundoNombre: '',
    clien_PrimerApellido: '',
    clien_SegundoApellido: '',
    clien_Sexo: '',
    estad_Id: 0,
    clien_Telefono: '',
    clien_Correo: '',
    munic_Id: '',
    clien_Direccion: '',
    clien_UsuarioCreacion: 0,
    clien_UsuarioModificacion: null,
    clien_FechaModificacion: null,
    clien_FechaCreacion: null,
    munic_Descripcion: '',
    estad_Descripcion: ''
  };


  constructor(private service: ventasEncabezadoServiceService, 
    private departamentoService: DepartamentoServiceService,
    private messageService: MessageService) {}

  dropdownOptions: any[] = []; 

  ngOnInit(): void {
    this.getEncabezado();
    this.getDepartamentos();



  }


  
  showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }
  onDropdownChange(event: any): void {
    this.ventaSeleccionado.venen_Id = event.value;
}





// -------------------- DDL---------------------------------------------------
getDepartamentos(): void {
  this.departamentoService.getDepartamento().subscribe(
    (response: any) => {
      console.log(response);
      this.dropdownOptions = response.data.map((departamento: any) => {
        return { label: departamento.depar_Descripcion, value: departamento.depar_Id };
      });
      console.log(this.dropdownOptions); 
    },
    error => {
      console.log(error);
    }
  );
}
// -------------------- DDL---------------------------------------------------


onGlobalFilter(event: any): void {
    const searchText = event.target.value.toLowerCase();
    this.departamento = this.departamento.filter((depto: VentasEncabezadoViewModel) => {
      return (
        depto.venen_Id.toString().toLowerCase().includes(searchText) ||
        depto.venen_DireccionEnvio.toLowerCase().includes(searchText) ||
        depto.sucur_Id.toString().toLowerCase().includes(searchText) ||
        depto.venen_FechaPedido.toString().toLowerCase().includes(searchText) ||
        depto.vende_Id.toString().toLowerCase().includes(searchText) ||


        depto.venen_UsuarioCreacion.toString().toLowerCase().includes(searchText) ||
        depto.venen_FechaCreacion.toString().toLowerCase().includes(searchText) ||
        (depto.venen_UsuarioModificacion && depto.venen_UsuarioModificacion.toString().toLowerCase().includes(searchText)) ||
        (depto.venen_FechaModificacion && depto.venen_FechaModificacion.toString().toLowerCase().includes(searchText)) ||
        (depto.venen_Estado && depto.venen_Estado.toString().toLowerCase().includes(searchText)) ||
        depto.mtPag_Id.toString().toLowerCase().includes(searchText) ||
        depto.venen_NroTarjeta.toLowerCase().includes(searchText) ||
        depto.emple_Id.toString().toLowerCase().includes(searchText) ||
        depto.empleado.toLowerCase().includes(searchText) ||
        depto.mtPag_Descripcion.toLowerCase().includes(searchText) ||
        depto.produ_Id.toString().toLowerCase().includes(searchText) ||
        depto.vende_Cantidad.toString().toLowerCase().includes(searchText) ||
        depto.produ_Descripcion.toLowerCase().includes(searchText) ||
        depto.produ_Existencia.toString().toLowerCase().includes(searchText) ||
        depto.unida_Id.toString().toLowerCase().includes(searchText) ||
        depto.produ_PrecioCompra.toString().toLowerCase().includes(searchText) ||
        depto.produ_PrecioVenta.toString().toLowerCase().includes(searchText) ||
        depto.impue_Id.toString().toLowerCase().includes(searchText) ||
        depto.categ_Id.toString().toLowerCase().includes(searchText) ||
        depto.prove_Id.toString().toLowerCase().includes(searchText) ||
        depto.produ_UsuarioCreacion.toString().toLowerCase().includes(searchText) ||
        depto.produ_FechaCreacion.toString().toLowerCase().includes(searchText) ||
        (depto.produ_UsuarioModificacion && depto.produ_UsuarioModificacion.toString().toLowerCase().includes(searchText)) ||
        (depto.produ_FechaModificacion && depto.produ_FechaModificacion.toString().toLowerCase().includes(searchText)) ||
        (depto.produ_Estado && depto.produ_Estado.toString().toLowerCase().includes(searchText)) ||
        depto.produ_ImagenUrl.toLowerCase().includes(searchText) ||
        depto.unida_Descripcion.toLowerCase().includes(searchText) ||
        depto.prove_Marca.toLowerCase().includes(searchText) ||
        depto.impue_Descripcion.toString().toLowerCase().includes(searchText) ||
        depto.usuarioCreacion.toLowerCase().includes(searchText) ||
        depto.usuarioModificacion.toLowerCase().includes(searchText) ||
        depto.categ_Descripcion.toLowerCase().includes(searchText) ||
        depto.sucur_Descripcion.toLowerCase().includes(searchText) ||
        depto.cliente.toLowerCase().includes(searchText) ||
        depto.clien_Id.toString().toLowerCase().includes(searchText) ||
        depto.clien_PrimerNombre.toLowerCase().includes(searchText) ||
        depto.clien_SegundoNombre.toLowerCase().includes(searchText) ||
        depto.clien_PrimerApellido.toLowerCase().includes(searchText) ||
        depto.clien_SegundoApellido.toLowerCase().includes(searchText) ||
        depto.clien_Sexo.toLowerCase().includes(searchText) ||
        depto.estad_Id.toString().toLowerCase().includes(searchText) ||
        depto.clien_Telefono.toLowerCase().includes(searchText) ||
        depto.clien_Correo.toLowerCase().includes(searchText) ||
        depto.munic_Id.toString().toLowerCase().includes(searchText) ||
        depto.clien_Direccion.toLowerCase().includes(searchText) ||
        depto.clien_UsuarioCreacion.toString().toLowerCase().includes(searchText) ||
        (depto.clien_UsuarioModificacion && depto.clien_UsuarioModificacion.toString().toLowerCase().includes(searchText)) ||
        (depto.clien_FechaModificacion && depto.clien_FechaModificacion.toString().toLowerCase().includes(searchText)) ||
        (depto.clien_FechaCreacion && depto.clien_FechaCreacion.toString().toLowerCase().includes(searchText)) ||
        depto.munic_Descripcion.toLowerCase().includes(searchText) ||
        depto.estad_Descripcion.toLowerCase().includes(searchText)
      );
    });
  }
  


//   CARGARLISTA
  getEncabezado(): void {
    this.service.getEncabezado().subscribe(
      (response: any) => {
        console.log(response);
        this.departamento = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  clear(): void {
    this.getEncabezado();
  }


  ventaSeleccionadoId: string = '';

eliminarVenta(ventaId: string): void {
    console.log('ID:', ventaId);
    this.ventaSeleccionadoId = ventaId;
    this.showDeleteConfirmation = true;
}

confirmarEliminacion(): void {
  if (this.ventaSeleccionadoId) {
      this.service.eliminarVentaEncabezado(this.ventaSeleccionadoId).subscribe(
          (response) => {
              console.log('Venta eliminado exitosamente', response);

              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Municipio eliminado correctamente' });

              this.getEncabezado();
              this.ventaSeleccionadoId = '';
          },
          (error) => {
              console.error('Error al eliminar el venta', error);
              this.ventaSeleccionadoId = '';
          }
      );
  } else {
      console.error('ID de la venta seleccionada está vacío');
  }
  this.showDeleteConfirmation = false;
}



cancelarEliminacion(): void {
  this.showDeleteConfirmation = false;
  this.ventaSeleccionadoId = '';
}


  

openModal(tipo: string, venta?: VentasEncabezadoViewModel): void {
  if (tipo === 'nuevo') {
      this.ventaSeleccionado = {
        venen_Id: 0,
        sucur_Id: 0,
        venen_DireccionEnvio: '',
        venen_FechaPedido: new Date(),
        venen_UsuarioCreacion: 0,
        venen_FechaCreacion: new Date(),
        venen_UsuarioModificacion: null,
        venen_FechaModificacion: null,
        venen_Estado: null,
        mtPag_Id: 0,
        venen_NroTarjeta: '',
        emple_Id: 0,
        empleado: '',
        mtPag_Descripcion: '',
        produ_Id: 0,
        vende_Cantidad: 0,
        produ_Descripcion: '',
        produ_Existencia: 0,
        unida_Id: 0,
        produ_PrecioCompra: 0,
        produ_PrecioVenta: 0,
        impue_Id: 0,
        categ_Id: 0,
        prove_Id: 0,
        produ_UsuarioCreacion: 0,
        produ_FechaCreacion: new Date(),
        produ_UsuarioModificacion: null,
        produ_FechaModificacion: null,
        produ_Estado: null,
        produ_ImagenUrl: '',
        unida_Descripcion: '',
        prove_Marca: '',
        impue_Descripcion: 0,
        usuarioCreacion: '',
        usuarioModificacion: '',
        categ_Descripcion: '',
        sucur_Descripcion: '',
        cliente: '',
        clien_Id: 0,
        clien_PrimerNombre: '',
        clien_SegundoNombre: '',
        clien_PrimerApellido: '',
        clien_SegundoApellido: '',
        clien_Sexo: '',
        estad_Id: 0,
        clien_Telefono: '',
        clien_Correo: '',
        munic_Id: '',
        clien_Direccion: '',
        clien_UsuarioCreacion: 0,
        clien_UsuarioModificacion: null,
        clien_FechaModificacion: null,
        clien_FechaCreacion: null,
        munic_Descripcion: '',
        estad_Descripcion: ''
        // munic_UsuarioCreacion: 0,
        // munic_FechaCreacion: new Date(),
        // munic_UsuarioModificacion: null,
        // munic_FechaModificacion: null,
        // depar_Descripcion: '',
        // munic_Estado: null
      };
      
      this.showModal = true;
  } else if (tipo === 'editar') {
      this.ventaSeleccionado = venta!;
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
    if (this.ventaSeleccionado.sucur_Id === 0 ) {
      this.showToast('error', 'Error Message', 'Por favor complete todos los campos obligatorios');
      return; 
    }
  
    console.log('Datos a enviar al servidor:', this.ventaSeleccionado);
  
    this.service.insertarVentaEncabezado(this.ventaSeleccionado).subscribe(
      (response: any) => {
        console.log('Municipio insertado correctamente:', response);
  
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Venta insertado correctamente' });
  
        this.getEncabezado();
        this.closeModal('nuevo');
      },
      error => {
        console.error('Error al insertar el encabezado:', error);
        this.showToast('error', 'Error Message', 'Error al insertar el encabezado');
  
      }
    );
  }
  
  


  guardarCambios(): void {
    this.service.actualizarVentaEncabezado(this.ventaSeleccionado).subscribe(
      (response) => {
        console.log('Municipio actualizado correctamente:', response);
        this.showToast('success', 'Success Message', 'venta actualizado correctamente');
        this.getEncabezado();
        this.closeModal('editar');
      },
      (error) => {
        console.error('Error al actualizar el venta:', error);
        this.showToast('error', 'Error Message', 'Error al actualizar el municipio');
      }
    );
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
  declarations: [ventaCreateComponent]
})
export class MetodoPagoListadoModule {}
