import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MetodoPagoListadoComponent } from './listMetodopago.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: MetodoPagoListadoComponent }
	])],
	exports: [RouterModule]
})
export class ListRoutingModule { }
