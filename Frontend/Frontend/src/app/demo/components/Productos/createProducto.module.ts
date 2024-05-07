import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterModule } from '@angular/router'; 
import { ProductoCreateComponent } from './createProducto.component';
// import { ventaCreateComponent } from '../../components/Ventas/createVenta.component';

@NgModule({
    declarations: [ProductoCreateComponent],
    imports: [
        CommonModule,
        RouterModule, 
        ToolbarModule,
        RouterModule.forChild([
            { path: 'ProductoCreate', component: ProductoCreateComponent } 
        ])
    ]
})
export class VentasEncabezadoCreateModule { }