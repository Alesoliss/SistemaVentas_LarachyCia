import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'rol', data: { breadcrumb: 'Rol' }, loadChildren: () => import('./Role/list-rol/roldemo.module').then(m => m.RolDemoModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AccesoRoutingModule { }
