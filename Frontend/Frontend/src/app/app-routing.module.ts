import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoginComponent } from './demo/components/Login/login.component';
import { DepartamentosListadoComponent } from "./demo/components/Departamentos/list.component";
import { CargosListadoComponent } from "./demo/components/Cargos/listCargo.component";
import { CategoriaListadoComponent } from './demo/components/Categorias/listCategoria.component';
import { EstadoCivilListadoComponent } from './demo/components/EstadosCiviles/listEstado.component';
import { ImpuestoListadoComponent } from './demo/components/Impuestos/listImpuesto.component';
import { MetodoPagoListadoComponent } from './demo/components/MetodosPago/listMetodopago.component';
import { MunicipioListadoComponent } from './demo/components/Municipios/listMunicipios.component';
import { ListUsuarioComponent } from './demo/components/Usuarios/listUsuarios.component';
import { UnidadesListadoComponent } from './demo/components/Unidades/listUnidad.component';
import { RolesListadoComponent } from './demo/components/Roles/listRol.component';
import { ListEmpleadoComponent } from './demo/components/Empleados/listEmpleados.component';
import { EstadisticosComponent } from './demo/components/dashboard/dashboard.component';
import { ProductoListadoComponent } from './demo/components/Productos/listProductos.component';
import { ProductoCreateComponent } from './demo/components/Productos/createProducto.component';
import { SucursalesListadoComponent } from './demo/components/Sucursales/listSucursales.component';
import { ListClienteComponent } from './demo/components/Cliente/listCliente.component';
// import { ProveedorDemoModule } from './demo/components/Proveedor/list-proveedor/Proveedordemo.module';
import { ListDemoComponent } from './demo/components/uikit/list/listdemo.component';
import { VentasEncabezadoListadoComponent } from './demo/components/Ventas/listVenta.component';
import { ventaCreateComponent } from './demo/components/Ventas/createVenta.component';
import { ReportesListadoComponent } from './demo/components/Reportes/listReportes.component';
import { Reporte1Component } from './demo/components/VisualizadorReporte1/reporte1.component';
import { FiltroReportesComponent } from './ReportesFiltrados/FiltroReportes.component';
import { ChartsDemoComponent } from '../../src/app/demo/components/uikit/charts/chartsdemo.component';





@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: LoginComponent 
            },
            {
                path: 'app', component: AppLayoutComponent,
                children: [
                    { path: 'Principal',  component:ListDemoComponent},
                    // { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'proveedor', data: { breadcrumb: 'Proveedor' }, loadChildren: () => import('../app/demo/components/Proveedor/list-proveedor/Proveedordemo.module').then(m => m.ProveedorDemoModule) },
                    { path: 'departamentos', component: DepartamentosListadoComponent }, 
                    { path: 'cargos', component: CargosListadoComponent }, 
                    { path: 'categoria', component: CategoriaListadoComponent }, 
                    { path: 'EstadoCivil', component: EstadoCivilListadoComponent }, 
                    { path: 'Impuesto', component: ImpuestoListadoComponent }, 
                    { path: 'metodoPago', component: MetodoPagoListadoComponent }, 
                    { path: 'municipio', component: MunicipioListadoComponent },
                    { path: 'usuario', component: ListUsuarioComponent }, 
                    { path: 'unidad', component: UnidadesListadoComponent },
                    { path: 'rol', component: RolesListadoComponent },
                    { path: 'Empleado', component: ListEmpleadoComponent },
                    { path: 'Empleado', component: ListEmpleadoComponent },
                    { path: 'Productos', component: ProductoListadoComponent },
                    { path: 'ProductoCreate', component: ProductoCreateComponent },
                    { path: 'Sucursal', component: SucursalesListadoComponent },
                    { path: 'Cliente', component: ListClienteComponent },
                    { path: 'ventaslistado', component: VentasEncabezadoListadoComponent },
                    { path: 'ventaCreate', component: ventaCreateComponent },
                    { path: 'reportes', component: ReportesListadoComponent },
                    { path: 'reporte1', component: Reporte1Component },
                    { path: 'ReporteFiltrado', component: FiltroReportesComponent },
                    { path: 'dashboard', component: EstadisticosComponent },
                    { path: 'charts', component: ChartsDemoComponent },
                   
                ]
            },
            // { path: 'reportee', loadChildren: () => import('./demo/components/VisualizadorReporte1/reporte1.module').then(m => m.LandingModule) },

            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
            // { path: 'reporte1', component: Reporte1Component },

        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}


