
import { ServiceService } from '../../api/Services/Graficas-service.service';
import { Chart, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ChartData, ChartOptions } from 'chart.js'; 
import { ChartModule } from 'primeng/chart';
import { Component, OnInit, NgModule,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { SelectItem } from 'primeng/api';

Chart.register(...registerables);

@Component({
  selector: 'app-estadisticos',
  templateUrl: './dashboard.component.html',
  providers: [MessageService] // Agregar MessageService como proveedor
})
export class EstadisticosComponent implements OnInit{
  fechaInicio: string;
  fechaFin: string;

  MyChart: Chart;
  MyChartSexo: Chart;
  MyChartModelo: Chart;
  MyChartEstado: Chart;

  chartDataEstado: ChartData;
  chartOptionsEstado: ChartOptions;

  chartDataModelo: ChartData;
  chartOptionsModelo: ChartOptions;

  constructor(
    private dashboardService: ServiceService,
    private messageService: MessageService // Inyectar MessageService
  ) { }

  ngOnInit(): void {
    const fechaActual = new Date().toISOString().slice(0, 10);
    this.fechaInicio = fechaActual;
    this.fechaFin = fechaActual;
    
//     console.log(this.fechaInicio + this.fechaFin)
    this.filtrarCompras();
  }

  filtrarCompras() {
    const fechaInicio = new Date(this.fechaInicio);
    const fechaFin = new Date(this.fechaFin);

    if (fechaInicio <= fechaFin) {
      
        const fechasEnRango: string[] = [];
        let fechaActual = new Date(fechaInicio);
        while (fechaActual <= fechaFin) {
            fechasEnRango.push(fechaActual.toISOString().slice(0, 7));
            fechaActual.setMonth(fechaActual.getMonth() + 1); 
        }

     
        this.dashboardService.VentasPorMes().subscribe(
            data => {
                
                const comprasFiltradas = data.filter(compra => {
                    const fechaCompra = `${compra.anio}-${compra.mes.padStart(2, '0')}`;
                    
                    return fechasEnRango.includes(fechaCompra);
                });
                
                this.renderizarGrafico(comprasFiltradas);
            },
            error => {
                console.error('Error al obtener datos de venta:', error);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener datos de la API.' });
            }
        );


this.dashboardService.ProductosVendidosPorCategoriaMesAnio().subscribe(
  data => {
      // Filtrar los datos por todas las fechas dentro del rango
      const comprasFiltradas = data.filter(compra => {
          const fechaCompra = `${compra.anio}-${compra.mes.padStart(2, '0')}`;
          return fechasEnRango.includes(fechaCompra);
      });
      // Renderizar gráfico con los datos filtrados
      this.renderizarGraficoModelo(comprasFiltradas);
  },
  error => {
      console.error('Error al obtener datos de préstamos:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener datos de la API.' });
  }
);

this.dashboardService.obtenerPrestaPorEstado().subscribe(
    data => {
        // Filtrar los datos por todas las fechas dentro del rango
        const comprasFiltradas = data.filter(compra => {
            const fechaCompra = `${compra.anio}-${compra.mes.padStart(2, '0')}`;
            return fechasEnRango.includes(fechaCompra);
        });
        // Renderizar gráfico con los datos filtrados
        this.renderizarGraficoEstado(comprasFiltradas);
    },
    error => {
        console.error('Error al obtener datos de préstamos:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener datos de la API.' });
    }
  );
    } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La fecha de inicio debe ser anterior o igual a la fecha de fin.' });
    }
}

  renderizarGrafico(compras: { anio: string, mes: string, cantidadVentas: number }[]) {
    const fechas = compras.map(compra => `${compra.anio}-${compra.mes}`);
    console.log(fechas)
    const cantidades = compras.map(compra => compra.cantidadVentas);

    if (this.MyChart) {
      this.MyChart.destroy(); // Destruir el gráfico existente si existe
    }

    this.MyChart = new Chart("barChart", {
      type: 'bar',
      data: {
        labels: fechas,
        datasets: [{
          label: 'Ventas',
          data: cantidades,
          backgroundColor: [
            'rgba(255, 193, 7, 0.6)', // Color #ffc107 para la primera compra
            'rgba(54, 162, 235, 0.6)', // Color para la segunda compra
            'rgba(255, 206, 86, 0.6)', // Color para la tercera compra
            // Añadir más colores si es necesario
          ],
          borderColor: [
            'rgba(255, 193, 7, 1)', // Color del borde para la primera compra
            'rgba(54, 162, 235, 1)', // Color del borde para la segunda compra
            'rgba(255, 206, 86, 1)', // Color del borde para la tercera compra
            // Añadir más colores si es necesario
          ],
          borderWidth: 1,
          barPercentage: 0.4 // Ajusta el ancho de las barras, un valor de 1 significa que las barras ocuparán todo el espacio disponible
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad de Prestamos',
              color: 'white' // Cambiar color de texto a blanco
            },
            ticks: {
              color: 'white' // Cambiar color de las etiquetas del eje Y a blanco
            }
          },
          x: {
            title: {
              display: true,
              text: 'Fecha',
              color: 'white' // Cambiar color de texto a blanco
            },
            ticks: {
              color: 'white' // Cambiar color de las etiquetas del eje X a blanco
            }
          }
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              color: 'white' // Cambiar color de las etiquetas de la leyenda a blanco
            }
          }
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
          }
        },
        responsive: true,
       
      }
    });
  }
  
//   renderizarGraficoSexo(compras: { anio: string, mes: string, clie_Sexo: string, cantidadPrestamos: number }[]) {
//     // Filtrar los datos por género (solo Femenino y Masculino)
//     const comprasFemenino = compras.filter(compra => compra.clie_Sexo === 'Femenino');
//     const comprasMasculino = compras.filter(compra => compra.clie_Sexo === 'Masculino');

//     // Obtener las cantidades de préstamos para cada género
//     const cantidadFemenino = comprasFemenino.reduce((total, compra) => total + compra.cantidadPrestamos, 0);
//     const cantidadMasculino = comprasMasculino.reduce((total, compra) => total + compra.cantidadPrestamos, 0);

//     // Renderizar el gráfico con solo dos barras (Femenino y Masculino)
//     if (this.MyChartSexo) {
//         this.MyChartSexo.destroy(); // Destruir el gráfico existente si existe
//     }

//     this.MyChartSexo = new Chart("barChartSexo", {
//         type: 'bar',
//         data: {
//             labels: ['Femenino', 'Masculino'],
//             datasets: [{
//                 label: 'Cantidad de Prestamos',
//                 data: [cantidadFemenino, cantidadMasculino],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.6)', // Color para Femenino
//                     'rgba(54, 162, 235, 0.6)', // Color para Masculino
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)', // Color del borde para Femenino
//                     'rgba(54, 162, 235, 1)', // Color del borde para Masculino
//                 ],
//                 borderWidth: 1,
//                 barPercentage: 0.4 // Ajusta el ancho de las barras
//             }]
//         },
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                     title: {
//                         display: true,
//                         text: 'Cantidad de Prestamos',
//                         color: 'white' // Cambiar color de texto a blanco
//                     },
//                     ticks: {
//                         color: 'white' // Cambiar color de las etiquetas del eje Y a blanco
//                     }
//                 },
//                 x: {
//                     title: {
//                         display: true,
//                         text: 'Sexo',
//                         color: 'white' // Cambiar color de texto a blanco
//                     },
//                     ticks: {
//                         color: 'white' // Cambiar color de las etiquetas del eje X a blanco
//                     }
//                 }
//             },
//             plugins: {
//                 legend: {
//                     display: false   // Ocultar leyenda ya que solo hay dos barras
//                 }
//             },
//             layout: {
//                 padding: {
//                     left: 10,
//                     right: 10,
//                     top: 10,
//                     bottom: 10
//                 }
//             },
//             responsive: true,
//         }
//     });
// }

renderizarGraficoModelo(compras: { anio: string, mes: string, categ_Descripcion: string, cantidadProductosVendidos: number }[]) {
  // Obtén los datos para el gráfico de estado civil
  const labels = compras.map(compra => `${compra.anio}-${compra.mes.padStart(2, '0')} - ${compra.categ_Descripcion}`);
  const data = compras.map(compra => compra.cantidadProductosVendidos);

  // Asigna los datos y opciones para el gráfico de estado civil
  this.chartDataModelo = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Colores para cada sector del gráfico
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] // Colores para el efecto hover
      }
    ]
  };

  this.chartOptionsModelo = {
    responsive: true,
    maintainAspectRatio: false,
    // Otras opciones que desees configurar...
  };
}

renderizarGraficoEstado(compras: { anio: string, mes: string, estad_Descripcion: string, cantidadCompras: number }[]) {
  // Obtén los datos para el gráfico de estado civil
  const labels = compras.map(compra => `${compra.anio}-${compra.mes.padStart(2, '0')} - ${compra.estad_Descripcion}`);
  const data = compras.map(compra => compra.cantidadCompras);

  // Asigna los datos y opciones para el gráfico de estado civil
  this.chartDataEstado = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Colores para cada sector del gráfico
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] // Colores para el efecto hover
      }
    ]
  };

  this.chartOptionsEstado = {
    responsive: true,
    maintainAspectRatio: false,
    // Otras opciones que desees configurar...
  };
}






  cambiarFechaInicio(event: Event) {
    this.fechaInicio = (event.target as HTMLInputElement).value;
    this.filtrarCompras();
  }

  cambiarFechaFin(event: Event) {
    this.fechaFin = (event.target as HTMLInputElement).value;
    this.filtrarCompras();
  }
}

@NgModule({
  imports: [
    OrderListModule,
    PickListModule,
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    RippleModule,
    FormsModule,ChartModule,
    FormsModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    DialogModule,
    ToastModule,
    SliderModule,
    RatingModule,
    MatButtonModule,
    DataViewModule
  ],
  declarations: [
    EstadisticosComponent
  ]
})
export class EstadisticosComponentModule { }