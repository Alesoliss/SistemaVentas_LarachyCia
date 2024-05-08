import { Component, OnInit, NgModule ,ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ReportesViewModel } from '../demo/api/Models/ReportesViewModel';
import { ReportesServiceService } from '../demo/api/Services/reportes-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
 import { Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './FiltroReportes.component.html',
  styleUrls: ['./FiltroReportes.component.css'] 

})
export class FiltroReportesComponent
 implements
 OnInit {
  collapse: boolean = false;

  Collapse: boolean = false;
  isReportOpen: boolean = false;

  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  isDateRangeOpen: boolean = true;
  isCollapsed = false;
  reportes!: ReportesViewModel[];
  showModal: boolean = false;
  editModal: boolean = false;
  deleteModal: boolean = false;
  reporteSeleccionado: ReportesViewModel = { 
    crecimiento: 0, 
    mes: '', 
    ventas: 0, 
    porcentaje_Crecimiento: 0,
    venen_FechaPedido1: null,
    venen_FechaPedido2: null
       };
  
  constructor(
    private service: ReportesServiceService,
     private router: Router,
     private modalservice: NgbModal) {}
    //  toggleCollapse() {
    //   this.Collapse = !this.Collapse;
    //   if (!this.Collapse && this.fechaInicio && this.fechaFin) {
    //     this.generarReporte();
    //   }
    // }

   
    
    // handleReportGeneration() {
    //   this.toggleCollapse(); // Primero, alternamos la visibilidad del colapso
    // }
    
     @ViewChild('content') popupview !: ElementRef;

    Invoiceheader: any;
    fecha1: any;
    fecha2: any;
    pdfurl = '';
    invoiceno: any;


    irAReporte1() {
      console.log('Datos a enviar a reporte 1:', this.reportes);
      this.router.navigate(['/app/reporte1'], { state: { reportes: this.reportes } });
    }
    
    ngOnInit(): void {
      this.isDateRangeOpen = false;
    this.isReportOpen = false;
      this.getReporte();
    }
    firstTimeClicked = true;

    firstClick: boolean = true;
    
    toggleCollapse(): void {
      if (!this.collapse && this.fechaInicio && this.fechaFin) {
        console.log('Primera vez que se hace clic');
        this.collapse = true;
        console.log('Segunda vez que se hace clic');
        this.collapse = !this.collapse;
        console.log('Tipo de fechaInicio:', typeof this.fechaInicio);
        console.log('Tipo de fechaFin:', typeof this.fechaFin);
          // Convertir las cadenas de texto en objetos Date
          const fechaInicioDate = new Date(this.fechaInicio);
          const fechaFinDate = new Date(this.fechaFin);
          console.log('Tipo de fechaInicio después de convertir:', typeof fechaInicioDate);
          console.log('Tipo de fechaFin después de convertir:', typeof fechaFinDate);
          console.log('Generando reporte...');
          this.generarReporte(fechaInicioDate, fechaFinDate);
        
      } 
    }
    




    // toggleCollapse(): void {
    //   if (this.firstClick) {
    //     console.log('Primera vez que se hace clic');
    //     this.firstClick = false;
    //     this.collapse = true;
    //   } 
    //   else
    //  {
    //     console.log('Segunda vez que se hace clic');
    //     this.collapse = !this.collapse;
    //     console.log('Tipo de fechaInicio:', typeof this.fechaInicio);
    //     console.log('Tipo de fechaFin:', typeof this.fechaFin);
    //     if (!this.collapse && this.fechaInicio && this.fechaFin) {
    //       // Convertir las cadenas de texto en objetos Date
    //       const fechaInicioDate = new Date(this.fechaInicio);
    //       const fechaFinDate = new Date(this.fechaFin);
    //       console.log('Tipo de fechaInicio después de convertir:', typeof fechaInicioDate);
    //       console.log('Tipo de fechaFin después de convertir:', typeof fechaFinDate);
    //       console.log('Generando reporte...');
    //       this.generarReporte(fechaInicioDate, fechaFinDate);
    //     }
    //   }
    // }
    
    
    

    
  

  //   collapse(){
  //     this.Collapse= true;
  // }








private formatDate(date: Date): string {
  // Formatear la fecha en el formato necesario, por ejemplo: 'YYYY-MM-DD'
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

  PrintInvoice(fecha1:any, fecha2:any) {
    this.service.GenerateInvoicePDF1(fecha1, fecha2).subscribe(res => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
  DownloadInvoice(fecha1:any, fecha2:any) {
    this.service.GenerateInvoicePDF1(fecha1, fecha2).subscribe(res => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
  
      let a = document.createElement('a');
      a.download = 'ReprteCrecimiento.pdf'; 
      a.href = url;
      a.click();
    });
  }
  


  generarReporte(fecha1: Date, fecha2: Date): void {
    const fecha1String = this.formatDateAsString(fecha1);
    const fecha2String = this.formatDateAsString(fecha2);
  
    this.service.GenerateInvoicePDF1(fecha1String, fecha2String).subscribe(res => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      this.pdfurl = url; // Asigna la URL del PDF al atributo pdfurl
      this.modalservice.open(this.popupview, { size: 'lg' });
    });
  }
  
  
  formatDateAsString(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    return `${year}-${month}-${day}`;
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  



  PreviewInvoice1() {

    this.service.GenerateInvoicePDF().subscribe(res => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      // this.pdfurl = url;
       this.pdfurl = window.URL.createObjectURL(blob);
      
      this.modalservice.open(this.popupview, { size: 'lg' });
    });
  }


  PreviewInvoice() {

    this.service.GenerateInvoicePDF().subscribe(res => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      // this.pdfurl = url;
       this.pdfurl = window.URL.createObjectURL(blob);
      
      this.modalservice.open(this.popupview, { size: 'lg' });
    });
  }


















  onGlobalFilter(event: any): void {
    const searchText = event.target.value.toLowerCase();
    this.reportes = this.reportes.filter((reporte: ReportesViewModel) => {
      return (
        reporte.crecimiento.toString().toLowerCase().includes(searchText) ||
        reporte.ventas.toString().toLowerCase().includes(searchText) ||
        reporte.mes.toLowerCase().includes(searchText) ||
        reporte.porcentaje_Crecimiento.toString().toLowerCase().includes(searchText)       );
    });
  }

  getReporte(): void {
    this.service.getReporte().subscribe(
      (response: any) => {
        console.log(response);
        this.reportes = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  clear(): void {
    this.getReporte(); 
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(tipo: string): void {
    if (tipo === 'nuevo') {
      this.showModal = false;
    } else if (tipo === 'editar') {
      this.editModal = false;
    } else if (tipo === 'eliminar') {
      this.deleteModal = false;
    }
  }

  cancelar(){
    this.Collapse= false;
   
}

    
    
  


  editRol(rol: ReportesViewModel): void {
    this.reporteSeleccionado = rol;
    this.editModal = true;
  }

  guardarCambios(): void {
    this.editModal = false;
  }

  deleteRol(rol: ReportesViewModel): void {
    this.reporteSeleccionado = rol;
    this.deleteModal = true;
  }

  eliminarRol(): void {
    this.deleteModal = false;
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
    NgxExtendedPdfViewerModule,
 NgbCollapseModule
    
  ],
  declarations: [FiltroReportesComponent]

})
export class FiltradoReportesListadoModule {}

