import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstadisticosComponent } from './dashboard.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EstadisticosComponent }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
