import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class YService {
  constructor() { }

  Reporte1PDF(cuerpo, logo, logo2, cliente, DNI, Fecha, Factura, Impuesto, Metodo, Subtotal, Total): Blob {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 15;
    const imgWidth = 50;
    const imgHeight = 30;     

    // Logos
    doc.addImage(logo, 'JPEG', margin, margin, imgWidth, imgHeight);
    doc.addImage(logo2, 'JPEG', pageWidth - margin - imgWidth, margin, imgWidth, imgHeight);

    const centerX = pageWidth / 2;
    const centerY = margin + (imgHeight / 2);

    // Company Information centered between logos
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('Larach y Compañia', centerX, centerY - 10, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Sucursar 1, Calle Principal #123, San Pedro Sula', centerX, centerY + 5, { align: 'center' });
    doc.text('Tel: +504 1234-5678', centerX, centerY + 15, { align: 'center' });

    const startY = margin + imgHeight + 20; // Adjusted to add more space under the company info

    // Client Information
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Cliente: ${cliente}`, margin, startY);
    doc.text(`DNI: ${DNI}`, margin, startY + 5);
    doc.text(`Fecha: ${Fecha}`, margin, startY + 10);
    doc.text(`Factura #: ${Factura}`, margin, startY + 15);

    // Financial details on the right
    const rightStartX = pageWidth - margin - 10; // Adjusted for right alignment
    doc.setFontSize(12);
    doc.text(`Subtotal: Lps${Subtotal}`, rightStartX, startY, { align: 'right' });
    doc.text(`Impuesto: ${Impuesto}%`, rightStartX, startY + 5, { align: 'right' });
    doc.text(`Total: Lps${Total}`, rightStartX, startY + 10, { align: 'right' });

    autoTable(doc, {
      startY: startY + 30,
      head: [['Producto', 'Cantidad', 'Precio Unitario', 'Total']],
      body: cuerpo,
      theme: 'grid',
      headStyles: { fillColor: [4, 100, 180], textColor: [255, 255, 255], halign: 'center', valign: 'middle', fontStyle: 'bold' },
      didDrawPage: data => {
        doc.setFontSize(10);
        doc.text(`Página ${data.pageNumber}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      }
    });

    return doc.output('blob'); // Generate PDF blob
  }
}
