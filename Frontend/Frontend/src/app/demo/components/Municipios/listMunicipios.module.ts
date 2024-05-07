import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { MunicipioListadoComponent } from './listMunicipios.component';
import { ToastModule } from 'primeng/toast'; // Importa ToastModule aquí

@NgModule({
  declarations: [MunicipioListadoComponent],
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
  exports: [MunicipioListadoComponent] 
})
export class MunicipiosModule { }
