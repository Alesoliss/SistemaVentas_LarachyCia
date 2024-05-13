import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'factura', data: { breadcrumb: 'Factura' }, loadChildren: () => import('./Factura/list-factura/Facturademo.module').then(m => m.FacturaDemoModule)},
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class VentaRoutingModule { }
