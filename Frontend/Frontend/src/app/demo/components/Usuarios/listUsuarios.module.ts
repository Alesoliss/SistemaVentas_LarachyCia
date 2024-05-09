import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { UsuarioListadoComponent } from './listUsuarios.component';
import { ToastModule } from 'primeng/toast'; // Importa ToastModule aquí

@NgModule({
  declarations: [UsuarioListadoComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule, 
    ToastModule
  ],
  providers: [MessageService],
  exports: [UsuarioListadoComponent] 
})
export class MunicipiosModule { }

