import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ServiceService } from '../../api/Services/Graficas-service.service';
import { ProductoMasCompradoMes,TotalVentasPorCategoria,ProductoMes,Ventatotalescatgoria } from '../../api/Models/GraficoViewModel';
import { dA } from '@fullcalendar/core/internal-common';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];
    maquillajeMes:ProductoMasCompradoMes[];
    JoyaMes:TotalVentasPorCategoria[];
    MaqJoyaMes:ProductoMes[];
    totalMa:Ventatotalescatgoria[];
   
   Top1:string;
   Catidad1:string ="";
   Top2:string;
   Catidad2: string;
   Top3:string;
   Catidad3: string ="";
   Top4:string;
   Catidad4: string;
   Top5:string;
   Catidad5: string;
   CantTop3: boolean = true;
porcentaje1: number;


 totalVendido1 : string;
 totalVendido2 : string;
totalfinalma: string;
totalfinaljo : string;
   Topm1:string;
   Catidadm1: string;
   Topm2:string;
   Catidadm2: string;
   Topm3:string;
   Catidadm3: string;
   Topm4:string;
   Catidadm4: string;
   Topm5:string;
   Catidadm5: string;

total1:string;
total2:string;
total3:string;
total4:string;
total5:string;
total6:string;
total7:string;
total8:string;
total9:string;
total10:string;
total11:string;
total12:string;
total13:string;
    pieData: any;
   
    chartData: any;
    pieOptions: any;
    chartOptions: any;

    subscription!: Subscription;
    top1: String = "arreglo[0]";
    cantidadTop1: Number = 30;


    constructor(private productService: ProductService, public service:ServiceService,public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    ngOnInit() {

        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

        // this.service.getproducto().subscribe((data: Productos[]) => {
        //     console.log(data);
        //     this.Productos = data;


            
        // });

      


        
        this.service.getMaquillajemes().subscribe({
            next: (data: ProductoMasCompradoMes[]) => {
                if (data && data.length > 0) {
                    this.Top1 = data[0].NombreProducto;
                    this.Catidad1 = data[0].TotalComprado;
                    if (data.length > 1) {
                        this.Top2 = data[1].NombreProducto;
                        this.Catidad2 = data[1].TotalComprado;
                    }
                    if (data.length > 2) {
                        this.Top3 = data[2].NombreProducto;
                        this.Catidad3 = data[2].TotalComprado;
                    }
                    if (data.length > 3) {
                        this.Top4 = data[3].NombreProducto;
                        this.Catidad4 = data[3].TotalComprado;
                    }
                    if (data.length > 4) {
                        this.Top5 = data[4].NombreProducto;
                        this.Catidad5 = data[4].TotalComprado;
                    }
                } else {
                    console.error("El arreglo 'data' está vacío o es null.");
                }
            },
            error: (error) => {
                console.error("Error al obtener datos:", error);
            }
        });
        
        console.log("estaaa"+this.Catidad1)
        if(this.Catidad3  == null){
          this.CantTop3 = false;
         }
          this.porcentaje1 = (parseInt(this.Catidad1) /100)* 100;







          this.service.getJoyas().subscribe({
            next: (data: TotalVentasPorCategoria[]) => {
               this.Topm1 = data[0].Producto,
               this.Catidadm1 = data[0].TotalVentas,
               this.Topm2 = data[1].Producto,
               this.Catidadm2 = data[1].TotalVentas,
               this.Topm3 = data[2].Producto,
               this.Catidadm3 = data[2].TotalVentas,
               this.Topm4 = data[3].Producto,
               this.Catidadm4 = data[3].TotalVentas,
               this.Topm5 = data[4].Producto,
               this.Catidadm5 = data[4].TotalVentas
               
            }
          });

     








        //   this.service.getto().subscribe({
        //     next: (data: totalanual[]) => {
        //        this.total1 = data[0].totalVentas,
        //        this.total2 = data[1].totalVentas,
        //        this.total3 = data[2].totalVentas,
        //        this.total4 = data[3].totalVentas,
        //        this.total5 = data[4].totalVentas,
        //        this.total6 = data[5].totalVentas,
        //        this.total7 = data[6].totalVentas,
        //        this.total8 = data[7].totalVentas,
        //        this.total9 = data[8].totalVentas,
        //        this.total10 = data[9].totalVentas,
        //        this.total11 = data[10].totalVentas,
        //        this.total12 = data[11].totalVentas,
        //        this.total13 = data[12].totalVentas
               
        //     }
        //   });










        // this.service.getMaquioJoya().subscribe((data: MaqJoyaMes[]) => {
        //     console.log(data);
        //     this.MaqJoyaMes = data;


            
        // });




        
        this.service.getMaquioJoya().subscribe((data: ProductoMes[]) => {
            console.log(data);
            this.MaqJoyaMes = data;

            this.totalVendido1 = data[0].Cantidad;
            
            
   
        });
   






        
        // this.service.gettm().subscribe((data: totalMa[]) => {
        //     console.log(data);
        //     this.totalMa = data;

         
        //     this.totalfinalma = data[0].totalFinal
   
        // });
   
  
        // this.service.gettj().subscribe((data: totalJo[]) => {
          
        //     this.totalJo = data;

         
        //     this.totalfinaljo = data[0].totalFinal
        //     console.log("el total"+this.totalfinaljo)

        // });
   




    }



    





    initChart() {
        
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
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
                }
            }
        };


       
   
        this.pieData = {
            
            labels: ['Productos', 'Categoria' ],
            datasets: [
                {
                    data: [this.totalfinaljo, this.totalfinalma],
                    
                    backgroundColor: [
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--bluegray-700'),
                        documentStyle.getPropertyValue('--teal-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--bluegray-700'),
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


    





























//     this.service.getMaquioJoya().subscribe((data: MaqJoyaMes[]) => {
       
//         this.MaqJoyaMes = data;

//         const totalVendidoe1 = data[0].cantidad;
//         const totalVendido2e = data[1].cantidad;
        

//     this.pieData = {
//         labels: ['Joyas', 'Maquillaje' ],
//         datasets: [
//             {
//                 data: [totalVendidoe1, totalVendido2e],
//                 backgroundColor: [
//                     documentStyle.getPropertyValue('--indigo-500'),
//                     documentStyle.getPropertyValue('--bluegray-700'),
//                     documentStyle.getPropertyValue('--teal-500')
//                 ],
//                 hoverBackgroundColor: [
//                     documentStyle.getPropertyValue('--indigo-400'),
//                     documentStyle.getPropertyValue('--bluegray-700'),
//                     documentStyle.getPropertyValue('--teal-400')
//                 ]
//             }]
//     };
// });

//     this.pieOptions = {
//         plugins: {
//             legend: {
//                 labels: {
//                     usePointStyle: true,
//                     color: textColor
//                 }
//             }
//         }
//     };

// }









    

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
