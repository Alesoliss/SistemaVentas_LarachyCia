import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterModule } from '@angular/router'; 
import { ventaCreateComponent } from './createVenta.component';
// import { ventaCreateComponent } from '../../components/Ventas/createVenta.component';

@NgModule({
    declarations: [ventaCreateComponent],
    imports: [
        CommonModule,
        RouterModule, 
        ToolbarModule,
        RouterModule.forChild([
            { path: 'ventaCreate', component: ventaCreateComponent } 
        ])
    ]
})
export class VentasEncabezadoCreateModule { }