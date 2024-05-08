import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl,  Validators  } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MunicipiosViewModel, Fill } from '../../api/Models/MunicipiosViewModel';
import { MunicipiosServiceService } from '../../api/Services/municipios-service.service';
import { DepartamentoServiceService } from '../../api/Services/departamento-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
 import { ToastModule } from 'primeng/toast'; 
 import { MensajeViewModel } from '../../api/Models/MensajeViewModel';

@Component({
  selector: 'app-list',
  templateUrl: './listMunicipios.component.html',
  styleUrls: ['./listMunicipios.component.css'],
  providers: [MessageService]
})

export class MunicipioListadoComponent implements OnInit {
  staticData = [{}];
  // msgs: Message[] = [];
  MunCodigo: boolean = true;

// showSuccessViaMessages() {
//   this.msgs = [];
//   this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Message sent' });
// }
  impuesto!: MunicipiosViewModel[];
  fill: any[] = [];
  Collapse: boolean = false;
  Detalles: boolean = false;
  municipioForm: FormGroup;

  showModal: boolean = false;
  editModal: boolean = false;
  showDeleteConfirmation: boolean = false;
  MensajeViewModel!: MensajeViewModel[];
  deleteModal: boolean = false;
  impuestoSeleccionado: MunicipiosViewModel = { 
    munic_Id: '', 
    munic_Descripcion: '', 
    depar_Id: '', 
    munic_UsuarioCreacion: 0, 
    munic_FechaCreacion: new Date(), 
    munic_UsuarioModificacion: null, 
    munic_FechaModificacion: null, 
    depar_Descripcion: '', 
    munic_Estado: null, 
    usuarioCreacion: '', 
    usuarioModificacion: '' 
    
  };
  deleteProductDialog: boolean = false;
  //Detalle
  Muni: String = "";
  Codigo: String = "";
  Depa: String = "";
  UsuarioCreacion: String = "";
  UsuarioModificacion: String = "";
  FechaCreacion: String = "";
  FechaModificacion: String = "";
  ID: String = "";

  constructor(private service: MunicipiosServiceService, 
    private departamentoService: DepartamentoServiceService,
    private messageService: MessageService) {}

  dropdownOptions: any[] = []; 

  ngOnInit(): void {
    this.getMunicipio();
    this.getDepartamentos();



  }

  cancelar(){
    this.Collapse= false;
    this.Detalles = false;
    this.municipioForm = new FormGroup({
        Muni_Codigo: new FormControl("",Validators.required),
        Muni_Municipio: new FormControl("", Validators.required),
        Depa_Codigo: new FormControl('0', [Validators.required])
    });
    this.MunCodigo=true;
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
          this.Muni = data.munic_Descripcion;
          this.Codigo = data.munic_Id;
          this.Depa = data.depar_Descripcion;
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




  
  showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }
  onDropdownChange(event: any): void {
    this.impuestoSeleccionado.depar_Id = event.value;
}

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

  onGlobalFilter(event: any): void {
    const searchText = event.target.value.toLowerCase();
    this.impuesto = this.impuesto.filter((impuesto: MunicipiosViewModel) => {
      return (
        impuesto.munic_Id.toLowerCase().includes(searchText) ||
        impuesto.munic_Descripcion.toLowerCase().includes(searchText) ||
        impuesto.depar_Id.toLowerCase().includes(searchText) ||
        impuesto.depar_Descripcion.toLowerCase().includes(searchText) ||
        impuesto.munic_UsuarioCreacion.toString().toLowerCase().includes(searchText) ||
        (impuesto.munic_FechaCreacion && impuesto.munic_FechaCreacion.toString().toLowerCase().includes(searchText)) ||
        (impuesto.munic_UsuarioModificacion && impuesto.munic_UsuarioModificacion.toString().toLowerCase().includes(searchText)) ||
        ((impuesto.munic_FechaModificacion && impuesto.munic_FechaModificacion.toString().toLowerCase().includes(searchText))) ||
        ((impuesto.munic_Estado !== null && impuesto.munic_Estado.toString().toLowerCase().includes(searchText)))
      );
    });
  }

  getMunicipio(): void {
    this.service.getMunicipio().subscribe(
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
    this.getMunicipio();
  }


  municipioSeleccionadoId: string = '';

eliminarMunicipio(municipioId: string): void {
    console.log('ID:', municipioId);
    // Almacena el ID del municipio seleccionado
    this.municipioSeleccionadoId = municipioId;
    // Muestra el modal de confirmación
    this.showDeleteConfirmation = true;
}

confirmarEliminacion(): void {
  if (this.municipioSeleccionadoId) {
      this.service.eliminarMunicipio(this.municipioSeleccionadoId).subscribe(
          (response) => {
              console.log('Municipio eliminado exitosamente', response);

              // Añadimos un mensaje de éxito aquí para verificar si se ejecuta
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Municipio eliminado correctamente' });

              this.getMunicipio();
              this.municipioSeleccionadoId = '';
          },
          (error) => {
            this.messageService.add({ severity: 'Error', summary: 'Danger Message', detail: 'El Municipio no se eliminado correctamente' });
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
  

openModal(tipo: string, municipio?: MunicipiosViewModel): void {
  if (tipo === 'nuevo') {
      // Limpiar el objeto impuestoSeleccionado antes de abrir el modal de inserción
      this.impuestoSeleccionado = {
          munic_Id: '',
          munic_Descripcion: '',
          depar_Id: '',
          munic_UsuarioCreacion: 0,
          munic_FechaCreacion: new Date(),
          munic_UsuarioModificacion: null,
          munic_FechaModificacion: null,
          depar_Descripcion: '',
          munic_Estado: null,
          usuarioCreacion: '',
          usuarioModificacion: ''
      };
      this.showModal = true;
  } else if (tipo === 'editar') {
      this.impuestoSeleccionado = municipio!;
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

  guardarNuevoMunicipio(): void {
    this.service.insertarMunicipio(this.impuestoSeleccionado).subscribe(
       (response: any) => {
        console.log('Municipio insertado correctamente:', response);
  
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Municipio insertado correctamente' });
  
         this.getMunicipio();
        this.closeModal('nuevo');
      },
      error => {
        console.error('Error al insertar el municipio:', error);
        this.showToast('error', 'Error Message', 'Error al insertar el municipio');
  
       }
     );
   }
  


  // guardarNuevoMunicipio(): void {
  //   // Verificar si hay campos vacíos
  //   if (!this.impuestoSeleccionado.munic_Descripcion || !this.impuestoSeleccionado.depar_Id) {
  //     // Mostrar mensaje de error con iziToast
  //     iziToast.error({
  //       title: 'Error',
  //       message: 'Por favor complete todos los campos.',
  //       position: 'topRight'
  //     });
  //     return; // Detener el proceso si hay campos vacíos
  //   }
  
  //   this.service.insertarMunicipio(this.impuestoSeleccionado).subscribe(
  //     (response: any) => {
  //       console.log('Municipio insertado correctamente:', response);
        
  //       // Mostrar mensaje de éxito con iziToast
  //       iziToast.success({
  //         title: 'Éxito',
  //         message: 'Municipio insertado correctamente.',
  //         position: 'topRight'
  //       });
        
  //       this.getMunicipio();
  //       this.closeModal('nuevo');
  //     },
  //     error => {
  //       console.error('Error al insertar el municipio:', error);
        
  //       // Mostrar mensaje de error con iziToast
  //       iziToast.error({
  //         title: 'Error',
  //         message: 'Error al insertar el municipio. Por favor, inténtelo de nuevo.',
  //         position: 'topRight'
  //       });
  //     }
  //   );
  // }

  guardarCambios(): void {
    this.service.actualizarMunicipio(this.impuestoSeleccionado).subscribe(
      (response) => {
        console.log('Municipio actualizado correctamente:', response);
        this.showToast('success', 'Success Message', 'Municipio actualizado correctamente');
        this.getMunicipio();
        this.closeModal('editar');
      },
      (error) => {
        console.error('Error al actualizar el municipio:', error);
        this.showToast('error', 'Error Message', 'Error al actualizar el municipio');
      }
    );
  }




  Fill(codigo) {
    this.service.getFill(codigo).subscribe({
        next: (data: Fill) => {
            this.municipioForm = new FormGroup({
                Muni_Codigo: new FormControl(data.munic_Id,Validators.required),
                Muni_Municipio: new FormControl(data.munic_Descripcion, Validators.required),
                Depa_Codigo: new FormControl(data.depar_Id, [Validators.required])
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
  declarations: [MunicipioListadoComponent]
})
export class MetodoPagoListadoModule {}