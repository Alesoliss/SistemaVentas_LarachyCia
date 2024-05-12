import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListProveedorComponent } from './list-proveedor.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ListProveedorComponent }
	])],
	exports: [RouterModule]
})
export class ListProveedorRoutingModule { }
