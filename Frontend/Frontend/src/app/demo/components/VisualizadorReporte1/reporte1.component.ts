import { Router } from '@angular/router';
import { ReportesViewModel } from '../../api/Models/ReportesViewModel';
import { ReportesServiceService } from '../../api/Services/reportes-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { Component, OnInit, NgModule } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';

@Component({
    selector: 'app-inicio-de-sesion',
    templateUrl:'./reporte1.component.html',
    styleUrls: ['./lisReporte1.component.css']
  })
  export class Reporte1Component implements OnInit {
    reportes: any[] = [];
 
  
    ngOnInit(): void {
      const navigation = window.history.state;
      if (navigation && navigation.reportes) {
        this.reportes = navigation.reportes;
      }
    }

  }
  
  
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    NgxPrintModule
  ],
  declarations: [Reporte1Component],
  providers: []
})
 export class DepartamentosListadoModule {}









