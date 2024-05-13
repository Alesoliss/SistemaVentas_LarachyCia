import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListFacturaComponent } from './list-factura.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ListFacturaComponent }
	])],
	exports: [RouterModule]
})
export class FacturaDemoRoutingModule { }
