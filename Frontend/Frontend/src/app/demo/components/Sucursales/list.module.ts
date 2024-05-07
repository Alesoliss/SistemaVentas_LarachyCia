import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';

import { SucursalesListadoComponent } from './listSucursales.component';

@NgModule({
    declarations: [SucursalesListadoComponent],
    imports: [
        CommonModule,
        ToolbarModule
    ]
})
export class SucursalesListadoModule { }
