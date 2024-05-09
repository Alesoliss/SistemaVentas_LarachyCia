import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListEmpleadoComponent } from './listEmpleados.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ListEmpleadoComponent }
	])],
	exports: [RouterModule]
})
export class EmpleadoDemoModule { }
