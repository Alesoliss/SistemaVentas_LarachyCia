import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl,  Validators  } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { UsuariosViewModel, Fill } from '../../api/Models/UsuariosViewModel';
import { EmpleadosServiceService } from '../../api/Services/empleados-service.service';
import { RolServiceService } from '../../api/Services/roles-service.service';
import { UsuariosServiceService } from '../../api/Services/usuarios-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
 import { ToastModule } from 'primeng/toast'; 
 import { MensajeViewModel } from '../../api/Models/MensajeViewModel';
@Component({
  selector: 'app-list',
  templateUrl: './listUsuarios.component.html',
  styleUrls: ['./listUsuarios.component.css'],
  providers: [MessageService]
})
export class UsuarioListadoComponent implements OnInit {
  usuario!: UsuariosViewModel[];
  UsuarioId: boolean = true;
  showModal: boolean = false;
  Collapse: boolean = false;
  Detalles: boolean = false;
  UsuarioForm: FormGroup;
  editModal: boolean = false;
  showDeleteConfirmation: boolean = false;
  MensajeViewModel!: MensajeViewModel[];
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
  deleteProductDialog: boolean = false;
  //Detalle
  usuar_Id: number = 0;
  usuar_Usuario: String = "";
  emple_Id: number = 0;
  roles_Id: number = 0;
  usuar_Admin: number = 0;
  UsuarioCreacion: String = "";
  UsuarioModificacion: String = "";
  FechaCreacion: String = "";
  FechaModificacion: String = "";
  

  constructor(private service: UsuariosServiceService, private router: Router, private messageService: MessageService,private EmpleadosServiceService: EmpleadosServiceService,
    private RolServiceService: RolServiceService
  ) {}
  showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }
  onDropdownChange(event: any): void {
    this.usuarioSeleccionado.roles_Id = event.value;
    this.usuarioSeleccionado.perso_Id = event.value;
}

  ngOnInit(): void {
    this.getUsuario();
    this.getEmpleados();
    this.getRol();
  }
  dropdownOptions: any[] = []; 
  cancelar(){
    this.Collapse= false;
    this.Detalles = false;
    this.UsuarioForm = new FormGroup({
        usuar_Usuario: new FormControl("",Validators.required),
        usuar_Admin: new FormControl("", Validators.required),
        emple_Id: new FormControl('0', [Validators.required])
    });
    this.UsuarioId=true;
}

  collapse(){
    this.Collapse= true;
    this.Detalles = false;
}
detalles(codigo) {
  this.Collapse = false;
  this.Detalles = true;
  this.service.getdetalles(codigo).subscribe({
      next: (response: any) => {
          const data = response.data[0]; // Acceder al primer elemento del array
          console.log('Respuesta del servidor:', data);
          this.usuar_Usuario = data.usuar_Usuario;
          this.usuar_Admin = data.usuar_Admin;
          this.roles_Id = data.roles_Id;
          this.emple_Id = data.emple_Id;
          this.UsuarioCreacion = data.usuarioCreacion;
          this.UsuarioModificacion = data.usuarioModificacion;
          this.FechaCreacion = data.munic_FechaCreacion;
          this.FechaModificacion = data.munic_FechaModificacion;
      },
      error: (error) => {
          console.error('Error al obtener detalles:', error);
      }
  });
}

getEmpleados(): void {
  this.EmpleadosServiceService.getCargo().subscribe(
    (response: any) => {
      console.log(response);
      this.dropdownOptions = response.data.map((Empleados: any) => {
        return { label: Empleados.empleado, value: Empleados.perso_Id };
      });
      console.log(this.dropdownOptions); 
    },
    error => {
      console.log(error);
    }
  );
}
getRol(): void {
  this.RolServiceService.getRoles().subscribe(
    (response: any) => {
      console.log(response);
      this.dropdownOptions = response.data.map((Rol: any) => {
        return { label: Rol.roles_Descripcion, value: Rol.roles_Id };
      });
      console.log(this.dropdownOptions); 
    },
    error => {
      console.log(error);
    }
  );
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
  municipioSeleccionadoId: string = '';

  eliminarcategoria(municipioId: number): void {
      console.log('ID:', municipioId);
      // Almacena el ID del municipio seleccionado
      this.municipioSeleccionadoId = municipioId.toString();
      // Muestra el modal de confirmación
      this.showDeleteConfirmation = true;
  }

  confirmarEliminacion(): void {
    if (this.municipioSeleccionadoId) {
        this.service.eliminarmetodo(parseInt(this.municipioSeleccionadoId)).subscribe(
            (response) => {
                console.log('Municipio eliminado exitosamente', response);
  
                // Añadimos un mensaje de éxito aquí para verificar si se ejecuta
                // this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Municipio eliminado correctamente' });
  
                this.getUsuario();
                this.municipioSeleccionadoId = '';
            },
            (error) => {
              // this.messageService.add({ severity: 'Error', summary: 'Danger Message', detail: 'El Municipio no se eliminado correctamente' });
                this.municipioSeleccionadoId = '';
            }
        );
    } else {
        console.error('ID del municipio seleccionado está vacío');
    }
    this.showDeleteConfirmation = false;
  }
  cancelarEliminacion(): void {
    this.showDeleteConfirmation = false;
    this.municipioSeleccionadoId = '';
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
  openModal(tipo: string, categoria?: UsuariosViewModel): void {
    if (tipo === 'nuevo') {
        // Limpiar el objeto impuestoSeleccionado antes de abrir el modal de inserción
        this.usuarioSeleccionado = {
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
        this.showModal = true;
    } else if (tipo === 'editar') {
        this.usuarioSeleccionado = categoria!;
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
    if (!this.usuarioSeleccionado.usuar_Usuario.trim() || !this.usuarioSeleccionado.usuar_Contrasena.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor complete todos los campos', life: 3000 });
      return; // Detener la ejecución si falta algún campo requerido
    }
  
    // Continuar con la lógica si los campos requeridos están llenos
    this.service.insertarUsuario(this.usuarioSeleccionado).subscribe(
      (response: any) => {
        console.log('Categoría insertada correctamente:', response);
        // Agregar mensaje de éxito si es necesario
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
        this.getUsuario();
        this.closeModal('nuevo');
      },
      (error) => {
        console.error('Error al insertar la categoría:', error);
        // Mostrar mensaje de error si es necesario
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro insertar', life: 3000 });
      }
    );
  }
  
  guardarCambios(): void {
    // Verificar que los campos requeridos no estén vacíos
    if (!this.usuarioSeleccionado.usuar_Usuario.trim()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor complete todos los campos', life: 3000 });
      return; // Detener la ejecución si falta algún campo requerido
    }
  
    // Continuar con la lógica si los campos requeridos están llenos
    this.service.actualizarUsuario(this.usuarioSeleccionado).subscribe(
      (response: any) => {
        console.log('Categoría actualizada correctamente:', response);
        // Agregar mensaje de éxito si es necesario
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Editado con Exito', life: 3000 });
        this.getUsuario();
        this.closeModal('editar');
      },
      (error) => {
        console.error('Error al actualizar la categoría:', error);
        // Mostrar mensaje de error si es necesario
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro Editar', life: 3000 });
      }
    );
  }
  

  // editDepartamento(depto: UsuariosViewModel): void {
  //   this.usuarioSeleccionado = depto;
  //   this.editModal = true;
  // }

  // guardarCambios(): void {
  //   this.editModal = false;
  // }

  // deleteDepartamento(depto: UsuariosViewModel): void {
  //   this.usuarioSeleccionado = depto;
  //   this.deleteModal = true;
  // }

  // eliminarDepartamento(): void {
  //   this.deleteModal = false;
  // }
  Fill(codigo) {
    this.service.getFill(codigo).subscribe({
        next: (data: Fill) => {
            this.UsuarioForm = new FormGroup({
                Usuario: new FormControl(data.usuar_Usuario,Validators.required),
                Empleados: new FormControl(data.emple_Id, Validators.required),
                Admin: new FormControl(data.usuar_Admin, [Validators.required])
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
    ToastModule
  ],
  declarations: [UsuarioListadoComponent]
})
export class UsuarioListadoModule {}
