import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MunicipioListadoComponent } from './listMunicipios.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: MunicipioListadoComponent }

	])],
	exports: [RouterModule]
})
export class ListRoutingModule { }
