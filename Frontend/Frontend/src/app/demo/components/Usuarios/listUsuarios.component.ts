import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { UsuariosViewModel } from '../../api/Models/UsuariosViewModel';
import { UsuariosServiceService } from '../../api/Services/usuarios-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './listUsuarios.component.html',
  styleUrls: ['./listUsuarios.component.css']
})
export class UsuarioListadoComponent implements OnInit {
  usuario!: UsuariosViewModel[];
  showModal: boolean = false;
  editModal: boolean = false;
  deleteModal: boolean = false;
  usuarioSeleccionado: UsuariosViewModel = { 
    usuar_Id: 0, 
    usuar_Usuario: '', 
    usuar_Contrasena: '', 
    emple_Id: 0, 
    roles_Id: 0, 
    usuar_Admin: false, 
    usuar_UltimaSesion: null, 
    usuar_UsuarioCreacion: 0, 
    usuar_FechaCreacion: new Date(), 
    usuar_UsuarioModificacion: null, 
    usuar_FechaModificacion: null, 
    usuar_Estado: null, 
    usuarioCreacion: '', 
    usuarioModificacion: '', 
    empleado: '', 
    roles_Descripcion: '', 
    perso_NombreCompleto: '', 
    perso_Id: 0, 
    usuar_Tipo: false
  };
  constructor(private service: UsuariosServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getUsuario();
  }

  onGlobalFilter(event: any): void {
    const searchText = event.target.value.toLowerCase();
    this.usuario = this.usuario.filter((municipio: UsuariosViewModel) => {
      return (
        municipio.usuar_Id.toString().toLowerCase().includes(searchText) ||
        municipio.usuar_Usuario.toLowerCase().includes(searchText) ||
        municipio.usuar_Contrasena.toLowerCase().includes(searchText) ||
        municipio.emple_Id.toString().toLowerCase().includes(searchText) ||
        municipio.roles_Id.toString().toLowerCase().includes(searchText) ||
        municipio.usuar_Admin.toString().toLowerCase().includes(searchText) ||
        (municipio.usuar_UltimaSesion && municipio.usuar_UltimaSesion.toString().toLowerCase().includes(searchText)) ||
        municipio.usuar_UsuarioCreacion.toString().toLowerCase().includes(searchText) ||
        (municipio.usuar_FechaCreacion && municipio.usuar_FechaCreacion.toString().toLowerCase().includes(searchText)) ||
        (municipio.usuar_UsuarioModificacion && municipio.usuar_UsuarioModificacion.toString().toLowerCase().includes(searchText)) ||
        (municipio.usuar_FechaModificacion && municipio.usuar_FechaModificacion.toString().toLowerCase().includes(searchText)) ||
        (municipio.usuar_Estado !== null && municipio.usuar_Estado.toString().toLowerCase().includes(searchText)) ||
        municipio.usuarioCreacion.toLowerCase().includes(searchText) ||
        municipio.usuarioModificacion.toLowerCase().includes(searchText) ||
        municipio.empleado.toLowerCase().includes(searchText) ||
        municipio.roles_Descripcion.toLowerCase().includes(searchText) ||
        municipio.perso_NombreCompleto.toLowerCase().includes(searchText) ||
        municipio.perso_Id.toString().toLowerCase().includes(searchText) ||
        municipio.usuar_Tipo.toString().toLowerCase().includes(searchText)
      );
    });
  }

  getUsuario(): void {
    this.service.getUsuarios().subscribe(
      (response: any) => {
        console.log(response);
        this.usuario = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  clear(): void {
    this.getUsuario();
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  editDepartamento(depto: UsuariosViewModel): void {
    this.usuarioSeleccionado = depto;
    this.editModal = true;
  }

  guardarCambios(): void {
    this.editModal = false;
  }

  deleteDepartamento(depto: UsuariosViewModel): void {
    this.usuarioSeleccionado = depto;
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
  declarations: [UsuarioListadoComponent]
})
export class UsuarioListadoModule {}
