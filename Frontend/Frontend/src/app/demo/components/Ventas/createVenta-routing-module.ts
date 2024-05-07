import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ventaCreateComponent } from './createVenta.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ventaCreateComponent }
	])],
	exports: [RouterModule]
})
export class ListRoutingModule { }
