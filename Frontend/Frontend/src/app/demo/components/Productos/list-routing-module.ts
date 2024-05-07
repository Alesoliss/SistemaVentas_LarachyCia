import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductoListadoComponent } from './listProductos.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProductoListadoComponent }
	])],
	exports: [RouterModule]
})
export class ListRoutingModule { }
