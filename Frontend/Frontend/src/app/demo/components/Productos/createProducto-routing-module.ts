import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductoCreateComponent } from './createProducto.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProductoCreateComponent }
	])],
	exports: [RouterModule]
})
export class ListRoutingModule { }
