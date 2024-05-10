import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { Product } from '../../../api/product';
import { MenuItem } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {ServiceService} from '../../../api/Services/Graficas-service.service'
import { ProductoMasCompradoMes,ProductoMes,Ventatotalescatgoria} from '../../../api/Models/GraficoViewModel';
@Component({
    templateUrl: './chartsdemo.component.html'
})
export class ChartsDemoComponent implements OnInit, OnDestroy {
 

    lineData: any;

    barData: any;


    //DATOS DASH #1
    cursosMesData: any;


    pieData: any;

    polarData: any;

    radarData: any;

    lineOptions: any;

    barOptions: any;

    pieOptions: any;

    polarOptions: any;

    radarOptions: any;

    subscription: Subscription;

    constructor(private layoutService: LayoutService, private Graficas: ServiceService) {
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initCharts();
            });
    }

    ngOnInit() {
        this.initCharts();

            // this.cursosimpservice.getCursoPorMesData().subscribe((Response: any)=> {
            //     console.log(Response.data);
            //     this.cursosMesData = Response.data;

            //   }, error=>{
            //     console.log(error);
            //   });

    }




    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.Graficas.getMaquillajemes().subscribe(data => {
            const months = data.map(item => new Date(item.year, item.month - 1).toLocaleString('default', { month: 'long' }));
        
            // Modifica la preparación de los datos para incluir el nombre del producto y la cantidad vendida
            const courseCounts = data.map(item => ({
                label: item.nombreProducto,
                data: [item.totalVendido]
            }));
        
            this.barData = {
                labels: months,
                datasets: courseCounts.map(item => ({
                    label: item.label,
                    // backgroundColor: '#FCEB32',
                    borderColor: '#1E88E5',
                    data: item.data
                }))
            };

            this.lineOptions = {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0  // Omitir decimales
                        }
                    },
                    x: {

                    }
                },
                plugins: {
                    legend: {
                        display: true
                    }
                }
            };
        });

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };

        this.pieData = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--teal-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--teal-400')
                    ]
                }]
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };

 


    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
