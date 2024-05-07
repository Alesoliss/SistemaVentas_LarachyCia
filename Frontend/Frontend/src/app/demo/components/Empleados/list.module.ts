import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';

import { EmpleadoListadoComponent } from './listEmpleados.component';

@NgModule({
    declarations: [EmpleadoListadoComponent],
    imports: [
        CommonModule,
        ToolbarModule
    ]
})
export class EmpleadosListadoModule { }
