import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientesListadoComponent } from './listCliente.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ClientesListadoComponent }
	])],
	exports: [RouterModule]
})
export class ListRoutingModule { }
