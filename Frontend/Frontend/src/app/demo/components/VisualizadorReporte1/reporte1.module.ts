import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { NgxPrintModule } from 'ngx-print';

import { Reporte1Component } from './reporte1.component';


@NgModule({
    declarations: [Reporte1Component],
    imports: [
      CommonModule,
      NgxPrintModule
    ],
    exports: [Reporte1Component] // Si necesitas exportar el componente
  })
export class ReporteListadoModule { }
