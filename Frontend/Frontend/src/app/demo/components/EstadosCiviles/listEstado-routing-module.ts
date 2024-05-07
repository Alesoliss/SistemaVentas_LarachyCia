import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstadoCivilListadoComponent } from './listEstado.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EstadoCivilListadoComponent }
	])],
	exports: [RouterModule]
})
export class ListRoutingModule { }
