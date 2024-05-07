import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RolesListadoComponent } from './listRol.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: RolesListadoComponent }
	])],
	exports: [RouterModule]
})
export class ListRoutingModule { }
