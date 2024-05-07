import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioListadoComponent } from './listUsuarios.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: UsuarioListadoComponent }
	])],
	exports: [RouterModule]
})
export class ListRoutingModule { }
