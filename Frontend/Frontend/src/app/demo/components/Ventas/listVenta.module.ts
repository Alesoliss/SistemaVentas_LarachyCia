import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterModule } from '@angular/router'; 
import { VentasEncabezadoListadoComponent } from './listVenta.component';
import { ventaCreateComponent } from '../../components/Ventas/createVenta.component';

@NgModule({
    declarations: [VentasEncabezadoListadoComponent],
    imports: [
        CommonModule,
        RouterModule, 
        ToolbarModule,
        RouterModule.forChild([
            { path: 'ventaCreate', component: ventaCreateComponent } // Agrega la ruta 'ventaCreate'
        ])
    ]
})
export class VentasEncabezadoListadoModule { }