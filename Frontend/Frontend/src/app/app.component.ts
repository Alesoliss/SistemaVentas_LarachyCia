import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent {
    constructor(private router:Router){}
        ListarDepartamento (){
            this.router.navigate(['departamentos']);
        }
        ListarEmpleados (){
            this.router.navigate(['cargos']);
        }
        ListarEstadosCiviles (){
            this.router.navigate(['EstadoCivil']);
        }
        ListarMunicipios (){
            this.router.navigate(['municipio']);
        }
        ListarCombosPersonales (){
            this.router.navigate(['rol']);
        }
        ListarComplementos (){
            this.router.navigate(['usuario']);
        }
        ListarPostres (){
            this.router.navigate(['unidad']);
        }
        ListarPromociones (){
            this.router.navigate(['Impuesto']);
        }
        ListarPromocionesComidas (){
            this.router.navigate(['metodoPago']);
        }
        ListarPromocionesSucursales (){
            this.router.navigate(['categoria']);
        }
        ListarPromocionesProductos (){
            this.router.navigate(['Productos']);
        }

        Inicio (){
            this.router.navigate(['Principal']);
        }
        
        ventaListado (){
            this.router.navigate(['ventaslistado']);
        }


        ventaCreate (){
            this.router.navigate(['ventaCreate']);
        }
        ProductoCreate (){
            this.router.navigate(['ProductoCreate']);
        }


        // reporte1 (){
        //     this.router.navigate(['reporte1']);
        // }
     
    }