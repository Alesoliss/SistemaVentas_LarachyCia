import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';

import { ClientesListadoComponent } from './listCliente.component';

@NgModule({
    declarations: [ClientesListadoComponent],
    imports: [
        CommonModule,
        ToolbarModule
    ]
})
export class SucursalesListadoModule { }
