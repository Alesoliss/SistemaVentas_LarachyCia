import { Component, OnInit, NgModule ,ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ReportesViewModel } from '../../api/Models/ReportesViewModel';
import { ReportesServiceService } from '../../api/Services/reportes-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


 import { Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './listReportes.component.html'

})
export class ReportesListadoComponent
 implements
 OnInit {
  reportes!: ReportesViewModel[];
  showModal: boolean = false;
  editModal: boolean = false;
  deleteModal: boolean = false;
  reporteSeleccionado: ReportesViewModel = { 
    crecimiento: 0, 
    mes: '', 
    ventas: 0, 
    porcentaje_Crecimiento: 0,
  };
  
  constructor(private service: ReportesServiceService,
     private router: Router,
     private modalservice: NgbModal) {}
     @ViewChild('content') popupview !: ElementRef;

    Invoiceheader: any;
    pdfurl = '';
    invoiceno: any;
    //  dtoptions: DataTables.Settings = {};
    //  dtTrigger:Subject<any>=new Subject<any>();

    irAReporte1() {
      console.log('Datos a enviar a reporte 1:', this.reportes);
      this.router.navigate(['/app/reporte1'], { state: { reportes: this.reportes } });
    }
    
  ngOnInit(): void {
    this.getReporte();
    // this.dtoptions = {
    //   pagingType: 'full_numbers',
    //   searching:true,
    // //  paging:false
    // lengthChange:false,
    // language:{
    //   searchPlaceholder:'Text Customer'
    // }

    // };
    // this.LoadInvoice();
  }









  // LoadInvoice() {
  //   this.service.GetAllInvoice().subscribe(res => {
  //     this.Invoiceheader = res;
  //     // this.dtTrigger.next(null);
  //   });
  // }

 

  PrintInvoice() {
    this.service.GenerateInvoicePDF().subscribe(res => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
  DownloadInvoice() {
    this.service.GenerateInvoicePDF().subscribe(res => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
  
      let a = document.createElement('a');
      a.download = 'ReprteCrecimiento.pdf'; 
      a.href = url;
      a.click();
    });
  }
  

  PreviewInvoice() {
    this.service.GenerateInvoicePDF().subscribe(res => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      this.pdfurl = url;
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

  closeModal(): void {
    this.showModal = false;
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
    DialogModule
  ],
  declarations: [ReportesListadoComponent]
})
export class ReportesListadoModule {}

