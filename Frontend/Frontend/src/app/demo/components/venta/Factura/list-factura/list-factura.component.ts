import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import { Detalle, Factura, FacturaEnviar,FacturaDetalle , Fill } from 'src/app/demo/components/Models/FacturaViewModel';
import { ServiceService } from 'src/app/demo/api/Services/Factura.service ';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
 import { YService } from '../../Impresion/Impresion.service';
 import { forkJoin } from 'rxjs';
import { Cliente } from 'src/app/demo/components/Models/ClienteViewModel';
import { MensajeViewModel } from 'src/app/demo/components/Models/MensajeViewModel';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { FormGroup, FormControl,  Validators, FormBuilder  } from '@angular/forms';
import { CountryService } from 'src/app/demo/service/country.service';
@Component({
  templateUrl: './list-factura.component.html',
  styleUrl: './list-factura.component.css',
  providers: [ConfirmationService, MessageService]
})
export class ListFacturaComponent {
  Factura!:Factura[];
  Subtotal: string = "0";
  Total: string = "0";
  FacturaDetalle!:FacturaDetalle[];
  Detalle!:Detalle[];
  routeItems: MenuItem[] = [];
  MensajeViewModel!: MensajeViewModel[];
  submitted: boolean = false;
  loading: boolean = false;
  departamentos: any[] = [];
  sucursal;
  Vende_ID: string = "0";
  fillDeta!:Fill[];

  fill: any[] = [];
  viewModel: FacturaEnviar = new FacturaEnviar();
  FacturaForm: FormGroup;
  DetalleForm: FormGroup;
  @ViewChild('filter') filter!: ElementRef;
  Collapse: boolean = false;
  DataTable: boolean = true;
  Tabla: boolean = false;
  Detalles: boolean = false;
  Agregar: boolean = true;
  MunCodigo: boolean = true;
  Valor: string = "";
  staticData = [{}];
  // para la factura
  pdfSrc: SafeResourceUrl | null = null;
  Reporte_1: boolean = false;

  deleteProductDialog: boolean = false;
  emitirProductDialog :boolean= false;
  //Detalle
  Esta: String = "";
  id: string="";
  UsuarioCreacion: String = "";
  UsuarioModificacion: String = "";
  FechaCreacion: String = "";
  FechaModificacion: String = "";
  ID: String = "";
  facura_impresa: any = null;

  selectedRadio: string = '1'; 





  //AUTOCOMPLETADO
  detalleForm: FormGroup;
  metodos: any[] = [];
  clientes: any[] = [];
  producto: any[] = [];

  countries: any[] = [];
  selectedCountryAdvanced: any[] = [];
  selectedClientesAdvanced: any[] = [];
  selectedProductosAdvanced: any[] = [];

  selectedMetodoPagoAdvanced: any[] = [];
  filteredMetodoPago: any[] = [];
  filteredCountries: any[] = [];
  filteredClientes: any[] = [];
  filteredProductos: any[] = [];
  selectedMetodo: string = '';
  detalle: any[];
  // private srvImprecion : YService,
  constructor(private service: ServiceService, private router: Router,private yService: YService, private sanitizer: DomSanitizer,
    private messageService: MessageService,private countryService: CountryService,private fb: FormBuilder
  
  ) { }


  ngOnInit(): void {
      this.service.getFacturas().subscribe((data: any)=>{
          console.log(data);
          this.Factura = data;
      },error=>{
        console.log(error);
      });

      this.service.getFacturasDetalle(0).subscribe((data: any)=>{
        console.log(data);
        this.FacturaDetalle = data;
    },error=>{
      console.log(error);
    });




    

      this.FacturaForm = new FormGroup({
        Venen_Id: new FormControl("0"),
        Clien_DNI: new FormControl(""),
        Clien_PrimerNombre: new FormControl("", [Validators.required]),
        MtPag_Id: new FormControl(""),

        Clien_Id: new FormControl("", [Validators.required]),
        Vende_Cantidad: new FormControl(""),
        Produ_Descripcion: new FormControl(""),
        Produ_Id: new FormControl("", Validators.required),

    });  
    this.DetalleForm = new FormGroup({
      produ_Descripcion: new FormControl("", Validators.required),
      Produ_Id: new FormControl("", Validators.required),
      Vende_Cantidad: new FormControl("", [Validators.required]),
      Venen_Id: new FormControl("",Validators.required),

  });





      //AUTOCOMPLETADO
  
    this.service.getMetodo().subscribe(meto => {
      this.metodos = meto;
   });
   this.service.getClientes().subscribe(client => {
    this.clientes = client;
    console.log(this.clientes)
    });


    this.service.getproductos().subscribe(producto => {
      this.producto = producto;
      console.log(this.producto)
      });

   } 







   onRadioChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.selectedRadio = target.value;

   
  }
  selectMetodoPago(metodo: string) {
    let valor = metodo === 'Efectivo' ? '1' : '2';
    this.FacturaForm.controls['MtPag_Id'].setValue(valor);
  }
  
   filterCountry(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
        const country = this.countries[i];
        
        if (country.text.toLowerCase().indexOf(query.toLowerCase()) == 0) {

            filtered.push(country);
        }
    }
   
    this.DetalleForm.get('Vende_Cantidad').setValue(1); 
    this.filteredCountries = filtered;
}

/////////////////////////////

filterMetodo(event: any) {
  const filtered: any[] = [];
  const query = event.query;
  for (let i = 0; i < this.metodos.length; i++) {
      const metodo = this.metodos[i];
      
      if (metodo.mepa_Metodo.toLowerCase().indexOf(query.toLowerCase()) == 0) {

          filtered.push(metodo);
      }
  }
 
  this.filteredMetodoPago = filtered;
}

handleKeyDown(event: KeyboardEvent) {
  if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      this.onSubmit(); 
  
  }
}
filterCliente(event: any) {
  const filtered: any[] = [];
  const query = event.query;
  for (let i = 0; i < this.clientes.length; i++) {
      const cliente = this.clientes[i];
      
      if (cliente.clien_DNI.indexOf(query.toLowerCase()) == 0) {

          filtered.push(cliente);
      }
  }
 
  this.filteredClientes = filtered;
}




filterProducto(event: any) {
  const filtered: any[] = [];
  const query = event.query;

  for (let i = 0; i < this.producto.length; i++) {
      const producto = this.producto[i];

      if (producto.produ_Id && producto.produ_Id.toString().indexOf(query) === 0) {
          filtered.push(producto);
      }
  }

  this.filteredProductos = filtered;
}




onSelectProduct(event) {

  this.FacturaForm.get('Produ_Id').setValue(event.value.produ_Id); 
  this.FacturaForm.get('Produ_Descripcion').setValue(event.value.produ_Descripcion); 

  

}

onSelectCliente(event) {

  console.log(event.value)
  this.FacturaForm.get('Clien_PrimerNombre').setValue(event.value.clien_PrimerNombre); 
  this.FacturaForm.get('Clien_Id').setValue(event.value.clien_Id
  ); 


}
onSelectMetodo(event) {

  this.FacturaForm.get('Mepa_Id').setValue(event.value.mepa_Id); 

}



subir() {
  if (this.DetalleForm.valid) {
    // Procesa los datos del formulario aquí
    console.log('Formulario enviado:', this.DetalleForm.value);
  } else {
    console.log('Formulario no válido');
  }
}






//  cancelar(){
//   this.Collapse= false;
//   this.DataTable = true;
//   this.Detalles = false;
//   this.ngOnInit();
//   this.submitted = false;
//   this.Agregar= true;
//   this.MunCodigo=true;
//   this.Valor = "";
// }




confirmDelete(id) {
  this.submitted = false;
  this.service.EliminarDetalles(this.Vende_ID,id).subscribe({
    
    next: (response) => {
      this.submitted = false;
        if(response.message == "La accion ha sido existosa"){
          this.service.getFacturasDetalle(this.Vende_ID).subscribe((data: any)=>{
            this.FacturaDetalle = data;
            console.log(this.Vende_ID);
            console.log(data);
            const total = data.reduce((sum, item) => {
            const itemTotal = parseFloat(item.total) || 0; 
            return sum + itemTotal;
                }, 0);
                      const impuesto = 15 / 100 || 0;
                      const TotalFinal = (total + (total * impuesto))
                      this.Subtotal = total.toFixed(2);
                      this.Total = TotalFinal.toFixed(2);
                      
                 });
           }else{
            
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro eliminar', life: 3000 });
           }
        this.submitted = false;
    },
});
}





Detalleees(codigo) {
  const Detalleees$ = this.service.getFacturasDetalle(codigo);
  const fill$ = this.service.getFill(codigo);

  forkJoin([Detalleees$, fill$]).subscribe({
    next: ([detallesData, data]) => {
      const cuerpo = detallesData.map(item => [
        item.producto.toString(),
        item.cantidad.toString(),
        item.precio_Unitario.toString(),
        item.total.toString()
      ]);

      console.log(cuerpo);
      const total = detallesData.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);
      const impuestoString = "15%";
      const impuesto = 15/ 100;
      const TotalFinal = total + (total * impuesto);
      const Subtotal = total.toFixed(2);
      const Total = TotalFinal.toFixed(2);

      const cliente = data[0].clien_PrimerNombre;
      const DNI =  data[0].clien_DNI;
      const Fecha = data[0].fechaCreacion;
      const Factura = data[0].venen_Id;
      const Metodo = data[0].mtPag_Id;
      const Impuesto = "15%";

      const logo="../../../../../../assets/demo/images/galleria/casto.png"
      const logo2="../../../../../../assets/demo/images/galleria/logo.png"

      const blob = this.yService.Reporte1PDF(cuerpo, logo,logo2, cliente, DNI,Fecha, Factura, Impuesto, Metodo, Subtotal, Total);
      const url = URL.createObjectURL(blob);
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      
      this.Reporte_1 = true;
      this.Collapse = false;
      this.DataTable = false;
      this.Agregar = false;
    },
    error: err => {
      console.error('Error al cargar los datos', err);
    }
  });
}












cancelar() {
  this.Collapse = false; // Este cambia el estado para cerrar el formulario
  this.DataTable = true;
  this.Detalles = false;

  this.ngOnInit();
  this.Agregar= true;
  this.submitted = false; // Restablecer el estado de 'submitted'
  this.FacturaForm.reset({
   
  });  this.MunCodigo=true;
  this.Valor = "";
  this.loadFacturaDetalle();
  this.submitted = false;
}




// cancelar() {
//   this.Collapse = false;
//   this.DataTable = true;
//   this.Agregar = true;
//   // Resetear todo el formulario a los valores iniciales
//   this.FacturaForm.reset({
//     MtPag_Id: '1', // Asumiendo que quieres resetear a un valor inicial
//     Vende_Cantidad: '1'
//   });
//   // También puedes querer recargar los datos de la tabla aquí
//   this.loadFacturaDetalle();
//   this.submitted = false;
// }






validarTexto(event: KeyboardEvent) {

  if (!/^[a-zA-Z\s]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
  }
}





onSubmit() {


  // && this.FacturaForm.get('Vende_Cantidad').value !== '0'
  if (this.FacturaForm.valid ) {
     this.viewModel = this.FacturaForm.value;
     this.viewModel.Venen_Id = this.Vende_ID;

     if (this.Valor == "Agregar") {
      this.service.EnviarFactura(this.viewModel).subscribe((data: MensajeViewModel[]) => {
          if(data["message"] == "Operación completada exitosamente."){
           this.Vende_ID = data["id"];
           this.DataTable = false;
           this.submitted = false;
           this.Detalles = false;
           this.Agregar = false;
           this.service.getFacturasDetalle(this.Vende_ID).subscribe((data: any)=>{
          this.FacturaDetalle = data;
          const total = data.reduce((sum, item) => {
            const itemTotal = parseFloat(item.total) || 0; // Si no es un número válido, usa 0
            console.log(item.total)
            return sum + itemTotal;
        }, 0);
        this.FacturaForm.patchValue({
                   Produ_Id: '',
                   Produ_Descripcion: '',
                   Vende_Cantidad: ''  // Suponiendo que el valor predeterminado de cantidad sea '1'
                   });
        const impuesto = 15 / 100 || 0;
        const TotalFinal = (total + (total * impuesto))
        this.Subtotal = total.toFixed(2);
        this.Total = TotalFinal.toFixed(2);
          });
          }else{
           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No hay stock de este producto', life: 3000 });
          }
          
       })
     } 
     else {
          this.service.ActualizarFactura(this.viewModel).subscribe((data: MensajeViewModel[]) => {
          if(data["message"] == "Operación completada exitosamente."){
           this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Actualizado con Exito', life: 3000 });
           this.Collapse= false;
           this.DataTable = true;
           this.Detalles = false;
           this.submitted = false;
           this.Agregar = false;
           this.ngOnInit();
   
          }else{
           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro actualizar', life: 3000 });
          }
          
       })
     }  
     
  }   
      else 
      {
          this.submitted = true;
      }
  }


// onSubmit() {
//   this.submitted = true;
//   if (this.FacturaForm.valid) {
//     const formData = this.FacturaForm.value;
//     this.viewModel.Venen_Id = this.Vende_ID;

//     if (this.Valor == "Agregar") {
//       this.service.EnviarFactura(formData).subscribe((data: MensajeViewModel[]) => {
//         if (data["message"] == "Operación completada exitosamente.") {
//           this.Vende_ID = data["id"];

//           this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
//           // Limpiar sólo los campos de producto, cantidad y código
//           this.FacturaForm.patchValue({
//             Produ_Id: '',
//             Produ_Descripcion: '',
//             Vende_Cantidad: ''  // Suponiendo que el valor predeterminado de cantidad sea '1'
//           });


//           this.service.getFacturasDetalle(this.Vende_ID).subscribe((data: any)=>{
//             console.log(data);
//             this.FacturaDetalle = data;
//         },error=>{
//           console.log(error);
//         });
//           // Refrescar la tabla que muestra los datos
//           this.loadFacturaDetalle();
//         } else {
//           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro insertar', life: 3000 });
//         }
//       });
//     }
//   } else {
//     // Manejar la validación del formulario aquí si es necesario
//   }
// }

loadFacturaDetalle() {
  this.service.getFacturasDetalle(0).subscribe((data: FacturaDetalle[]) => {
    this.FacturaDetalle = data;
  });
}


  collapse(){
    this.Collapse= true;
    this.Vende_ID= "0";

    this.DataTable = false;
    this.Valor = "Agregar";
    this.Agregar= false;
    this.Detalles = false;
    this.Tabla = false;
}





Fill(codigo) {
  this.service.getFill(codigo).subscribe({

    next: (data: Fill) => {
      console.log(data);
      this.submitted = false;
      this.FacturaForm = new FormGroup({
        
        //FACTUR      this.submitted = false;
        MtPag_Id: new FormControl(data[0].mtPag_Id, Validators.required),
        Clien_Id: new FormControl(data[0].clien_Id, [Validators.required]),
        Clien_DNI: new FormControl(""),
        Clien_PrimerNombre: new FormControl(data[0].clien_PrimerNombre, [Validators.required]),
        Produ_Descripcion: new FormControl(""),

        //Detalle
        Produ_Id: new FormControl("", Validators.required),
        Vende_Cantidad: new FormControl("", [Validators.required]),
    });  
    this.selectMetodoPago = data[0].mepa_Id;
 
    this.submitted = false;
    if (data.clie_Id == "1") {
      this.FacturaForm.get('Clien_DNI').setValue(""); 
    }else{
      this.FacturaForm.get('Clien_DNI').setValue(data[0].clien_DNI); 
    }
    }
  });




  
  this.service.getFacturasDetalle(codigo).subscribe((data: any)=>{
    this.FacturaDetalle = data;
    const total = data.reduce((sum, item) => {
      const itemTotal = parseFloat(item.total) || 0; 
      return sum + itemTotal;
  }, 0);
  const impuesto = 15 / 100 || 0;
  const TotalFinal = (total + (total * impuesto))
  this.Subtotal = total.toFixed(2);
  this.Total = TotalFinal.toFixed(2);
  this.Collapse = true;
  this.DataTable = false;
  this.Agregar = false;
  this.Detalles = false;
  this.Vende_ID = codigo;
  this.Valor = "Agregar";
  });






}





emitirSelectedProducts(codigo) {
  this.emitirProductDialog = true;
  this.ID = codigo;
  console.log("El codigo es" + codigo);
}
confirmarEmision() {
  this.service.EmitirFactura(this.ID).subscribe({
      next: (response) => {
          if(response.message == "La accion ha sido existosa"){
             this.ngOnInit();
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Emitida con exito', life: 3000 });
              this.Collapse= false;
              this.DataTable = true;
              this.Detalles = false;
              this.submitted = false;
              this.emitirProductDialog = false;
             }else{
              this.emitirProductDialog = false;
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro emitir', life: 3000 });
             }
      },
  });

}





}

