import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { VentasEncabezadoViewModel } from '../../api/Models/VentasEncabezadoViewModel';
import { ventasEncabezadoServiceService } from '../../api/Services/ventasEncabezado-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-list',
  templateUrl: './listVenta.component.html',
  styleUrls: ['./listVenta.component.css'],
  providers: [MessageService]
})
export class VentasEncabezadoListadoComponent implements OnInit {
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

  constructor(private service: ventasEncabezadoServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getEncabezado();
  }

  onGlobalFilter(event: any): void {
    const searchText = event.target.value.toLowerCase();
    this.departamento = this.departamento.filter((depto: VentasEncabezadoViewModel) => {
      return (
        depto.venen_Id.toString().toLowerCase().includes(searchText) ||
        depto.venen_DireccionEnvio.toLowerCase().includes(searchText) ||
        depto.sucur_Id.toString().toLowerCase().includes(searchText) ||
        depto.venen_FechaPedido.toString().toLowerCase().includes(searchText) ||
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
    this.getEncabezado(); // Recargar los departamentos originales
  }

  openModal(): void {
    this.router.navigate(['app/ventaCreate']);
}


  closeModal(): void {
    this.showModal = false;
  }

  editDepartamento(depto: VentasEncabezadoViewModel): void {
    this.ventaSeleccionado = depto;
    this.editModal = true;
  }

  guardarCambios(): void {
    this.editModal = false;
  }

  deleteDepartamento(depto: VentasEncabezadoViewModel): void {
    this.ventaSeleccionado = depto;
    this.deleteModal = true;
  }

  eliminarDepartamento(): void {
    this.deleteModal = false;
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
  declarations: [VentasEncabezadoListadoComponent]
})
export class DepartamentosListadoModule {}
