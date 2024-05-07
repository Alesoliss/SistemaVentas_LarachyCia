import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { CategoriaListadoComponent } from './listCategoria.component';
import { ToastModule } from 'primeng/toast'; // Importa ToastModule aquí

@NgModule({
  declarations: [CategoriaListadoComponent],
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
  exports: [CategoriaListadoComponent] // Si necesitas exportarlo para usarlo en otros módulos
})
export class CategoriaModule { }