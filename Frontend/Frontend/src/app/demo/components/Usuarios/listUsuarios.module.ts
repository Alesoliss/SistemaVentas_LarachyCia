import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';

import { MunicipioListadoComponent } from './listUsuarios.component';

@NgModule({
    declarations: [MunicipioListadoComponent],
    imports: [
        CommonModule,
        ToolbarModule
    ]
})
export class CargosListadoModule { }
