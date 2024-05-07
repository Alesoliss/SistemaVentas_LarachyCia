import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportesListadoComponent } from './listReportes.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


 @NgModule({
    declarations: [ReportesListadoComponent],
     imports: [
        CommonModule,
         ToolbarModule,
         BrowserModule, 
         HttpClientModule,
        NgModule,
        NgxExtendedPdfViewerModule
     ],
     exports: [ReportesListadoComponent
     ]
 })
export class ReportesListadoModule { }
