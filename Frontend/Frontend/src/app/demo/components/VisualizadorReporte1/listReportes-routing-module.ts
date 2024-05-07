import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Reporte1Component } from './reporte1.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: Reporte1Component }
	])],
	exports: [RouterModule]
})
export class ListRoutingModule { }
