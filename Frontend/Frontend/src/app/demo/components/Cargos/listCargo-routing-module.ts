import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CargosListadoComponent } from './listCargo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CargosListadoComponent }
	])],
	exports: [RouterModule]
})
export class ListRoutingModule { }
