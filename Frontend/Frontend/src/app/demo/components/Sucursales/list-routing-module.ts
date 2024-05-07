import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SucursalesListadoComponent } from './listSucursales.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: SucursalesListadoComponent }
	])],
	exports: [RouterModule]
})
export class ListRoutingModule { }
