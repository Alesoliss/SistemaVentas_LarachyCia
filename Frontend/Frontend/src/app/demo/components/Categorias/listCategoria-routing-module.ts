import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriaListadoComponent } from './listCategoria.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CategoriaListadoComponent }
	])],
	exports: [RouterModule]
})
export class ListRoutingModule { }
