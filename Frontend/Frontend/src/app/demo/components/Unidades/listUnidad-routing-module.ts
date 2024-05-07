import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UnidadesListadoComponent } from './listUnidad.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: UnidadesListadoComponent }
	])],
	exports: [RouterModule]
})
export class ListRoutingModule { }
