import { Injectable } from '@angular/core';
import {ReportesViewModel} from '../Models/ReportesViewModel';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ReportesServiceService {

  constructor(private http: HttpClient) { }
  Url = 'https://localhost:44300/API/Reportes/Listado';

  getReporte (){
    return this.http.get<ReportesViewModel[]>(this.Url);
  }


// urls
  GetCustomer() {
    return this.http.get('https://localhost:7118/Customer/GetAll');
  }
  GetCustomerbycode(code: any) {
    return this.http.get('https://localhost:7118/Customer/GetByCode?Code='+code);
  }
  GetProducts() {
    return this.http.get('https://localhost:7118/Product/GetAll');
  }
  GetProductbycode(code: any) {
    return this.http.get('https://localhost:7118/Product/GetByCode?Code='+code);
  }

  GetAllInvoice(){
    return this.http.get('https://localhost:7118/Invoice/GetAllHeader');
  }

  GetInvHeaderbycode(invoiceno:any){
    return this.http.get('https://localhost:7118/Invoice/GetAllHeaderbyCode?invoiceno='+invoiceno);
  }
  GetInvDetailbycode(invoiceno:any){
    return this.http.get('https://localhost:7118/Invoice/GetAllDetailbyCode?invoiceno='+invoiceno);
  }
  RemoveInvoice(invoiceno:any){
    return this.http.delete('https://localhost:7118/Invoice/Remove?invoiceno='+invoiceno);
  }

  SaveInvoice(invoicedata:any){
    return this.http.post('https://localhost:7118/Invoice/Save',invoicedata);
  }

  GenerateInvoicePDF() {
    return this.http.get('https://localhost:44300/API/Reportes/ReporteCrecimiento',
     { observe: 'response', responseType: 'blob' });
  }

  GenerateInvoicePDF1(fecha1: string, fecha2: string) {
    return this.http.get(`https://localhost:44300/API/Reportes/ReporteCrecimientoVentas?Venen_FechaPedido1=${fecha1}&Venen_FechaPedido2=${fecha2}`, { observe: 'response', responseType: 'blob' });
  }
  



  // GenerateInvoicePDF1(fecha1: string, fecha2: string) {
  //   const url = `https://localhost:44300/API/Reportes/ReporteCrecimientoVentas?Venen_FechaPedido1=${fecha1}&Venen_FechaPedido2=${fecha2}`;
  //   return this.http.get(url, { observe: 'response', responseType: 'blob' });
}

  






