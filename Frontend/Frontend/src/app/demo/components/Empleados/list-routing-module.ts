import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmpleadoListadoComponent } from './listEmpleados.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EmpleadoListadoComponent }
	])],
	exports: [RouterModule]
})
export class ListRoutingModule { }
