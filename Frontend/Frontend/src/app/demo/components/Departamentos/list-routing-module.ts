import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DepartamentosListadoComponent } from './list.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DepartamentosListadoComponent }
	])],
	exports: [RouterModule]
})
export class ListRoutingModule { }
