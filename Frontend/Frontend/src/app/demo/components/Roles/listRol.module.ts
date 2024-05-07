import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';

import { RolesListadoComponent } from './listRol.component';

@NgModule({
    declarations: [RolesListadoComponent],
    imports: [
        CommonModule,
        ToolbarModule
    ]
})
export class RolesListadoModule { }
