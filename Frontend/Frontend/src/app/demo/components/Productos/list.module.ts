import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';

import { ProductoListadoComponent } from './listProductos.component';

@NgModule({
    declarations: [ProductoListadoComponent],
    imports: [
        CommonModule,
        ToolbarModule
    ]
})
export class ProductosListadoModule { }
