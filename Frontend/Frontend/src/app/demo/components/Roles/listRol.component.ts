import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { RolesViewModel } from '../../api/Models/RolesViewModel';
import { RolServiceService } from '../../api/Services/roles-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './listRol.component.html',
  styleUrls: ['./listRol.component.css']
})
export class RolesListadoComponent implements OnInit {
  roles!: RolesViewModel[];
  showModal: boolean = false;
  editModal: boolean = false;
  deleteModal: boolean = false;
  rolSeleccionado: RolesViewModel = { 
    roles_Id: 0, 
    roles_Descripcion: '', 
    roles_UsuarioCreacion: 0, 
    roles_FechaCreacion: new Date(), 
    roles_UsuarioModificacion: null, 
    roles_FechaModificacion: null, 
    roles_Estado: null, 
    scoop: 0,
    pantallas: [],
    pantallasID: [],
    resultado: 0,
    nul: '',
    usuarioCreacion: '', 
    usuarioModificacion: '', 
    pantID: 0, 
    pantDescripcion: ''
  };
  
  constructor(private service: RolServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getRoles();
  }

  onGlobalFilter(event: any): void {
    const searchText = event.target.value.toLowerCase();
    this.roles = this.roles.filter((rol: RolesViewModel) => {
      return (
        rol.roles_Id.toString().toLowerCase().includes(searchText) ||
        rol.roles_Descripcion.toLowerCase().includes(searchText)
      );
    });
  }

  getRoles(): void {
    this.service.getRoles().subscribe(
      (response: any) => {
        console.log(response);
        this.roles = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  clear(): void {
    this.getRoles(); // Recargar los roles originales
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  editRol(rol: RolesViewModel): void {
    this.rolSeleccionado = rol;
    this.editModal = true;
  }

  guardarCambios(): void {
    // Lógica para guardar los cambios en el rol
    this.editModal = false;
  }

  deleteRol(rol: RolesViewModel): void {
    // Lógica para eliminar el rol
    this.rolSeleccionado = rol;
    this.deleteModal = true;
  }

  eliminarRol(): void {
    // Lógica para confirmar y eliminar el rol
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
  declarations: [RolesListadoComponent]
})
export class RolesListadoModule {}
