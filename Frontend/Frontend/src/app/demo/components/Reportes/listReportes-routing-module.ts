import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReportesListadoComponent } from './listReportes.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ReportesListadoComponent }
	])],
	exports: [RouterModule]
})
export class ListRoutingModule { }
