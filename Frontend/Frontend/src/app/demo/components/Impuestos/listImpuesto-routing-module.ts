import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImpuestoListadoComponent } from './listImpuesto.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ImpuestoListadoComponent }
	])],
	exports: [RouterModule]
})
export class ListRoutingModule { }
