import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VentasEncabezadoListadoComponent } from './listVenta.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: VentasEncabezadoListadoComponent }
	])],
	exports: [RouterModule]
})
export class ListRoutingModule { }
