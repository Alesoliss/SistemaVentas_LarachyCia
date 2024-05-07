import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FiltroReportesComponent } from './FiltroReportes.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: FiltroReportesComponent }
	])],
	exports: [RouterModule]
})
export class ListRoutingModule { }
