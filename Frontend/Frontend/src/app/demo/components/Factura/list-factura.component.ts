import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import { Factura, FacturaEnviar  } from '../../api/Models/VentasViewModel';
import { ServiceService } from '../../api/Services/Factura.service';

// import { YService } from '../../Impresion/impresion.service';
// import { Cliente } from '../..';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { FormGroup, FormControl,  Validators, FormBuilder  } from '@angular/forms';
import { CountryService } from 'src/app/demo/service/country.service';


@Component({
  templateUrl: './list-factura.component.html',
  styleUrl: '/list-factura.component.css',
  providers: [ConfirmationService, MessageService]
})


export class ListFacturaComponent {
  Factura!:Factura[];

  routeItems: MenuItem[] = [];
  submitted: boolean = false;
  loading: boolean = false;
  departamentos: any[] = [];
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


  deleteProductDialog: boolean = false;
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




  detalleForm: FormGroup;
  countries: any[] = [];
  selectedCountryAdvanced: any[] = [];
  filteredCountries: any[] = [];
  constructor(private service: ServiceService, private router: Router,
    private messageService: MessageService,private countryService: CountryService,private fb: FormBuilder
  
  ) { }


  ngOnInit(): void {
      this.service.getFacturas().subscribe((data: any)=>{
          console.log(data);
          this.Factura = data;
      },error=>{
        console.log(error);
      });
      this.FacturaForm = new FormGroup({
        Impu_Id: new FormControl("0",Validators.required),
        Mepa_Id: new FormControl("", Validators.required),
        Empl_Id: new FormControl("", [Validators.required]),
        Clie_Id: new FormControl("", [Validators.required]),
        Clie_DNI: new FormControl("", [Validators.required]),
        Impu_Impuesto: new FormControl("15%",Validators.required),
        Clie_Nombre: new FormControl("Usuario", [Validators.required]),
        Empl_Nombre: new FormControl("Aleeee", [Validators.required]),
    });  
    this.DetalleForm = new FormGroup({
      radio: new FormControl("1",Validators.required),
      Faxd_Dif: new FormControl("1",Validators.required),
      Prod_Producto: new FormControl("", Validators.required),
      Prod_Id: new FormControl("", Validators.required),
      Faxd_Cantidad: new FormControl("", [Validators.required]),
      Fact_Id: new FormControl("",Validators.required),
  });



   } 

   onRadioChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.selectedRadio = target.value;

 
      this.service.getAutoCompletadoProducto().subscribe(countries => {
        this.countries = countries;
        this.DetalleForm = new FormGroup({
          Produ_Descripcion: new FormControl("", Validators.required),
          Produ_Id: new FormControl("", Validators.required),
          Vendet_Cantidad: new FormControl("", [Validators.required]),
          Venen_Id: new FormControl("",Validators.required),
      });
    });
  
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
// validarTexto(event: KeyboardEvent) {

//   if (!/^[a-zA-Z\s]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
//       event.preventDefault();
//   }
// }
onSubmit() {
  if (this.FacturaForm.valid && this.FacturaForm.get('Impu_Id').value !== '0') {
     this.viewModel = this.FacturaForm.value;
     if (this.Valor == "Agregar") {
      this.service.EnviarFactura(this.viewModel).subscribe((data:[]) => {
          if(data["message"] == "Operación completada exitosamente."){
           this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
           this.Collapse= false;
           this.DataTable = true;
           this.submitted = false;
           this.Detalles = false;
           this.Agregar = true;
           this.ngOnInit();
   
          }else{
           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro insertar', life: 3000 });
          }
         
       })
     } else {
          this.service.ActualizarFactura(this.viewModel).subscribe((data: []) => {
          if(data["message"] == "Operación completada exitosamente."){
           this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Actualizado con Exito', life: 3000 });
           this.Collapse= false;
           this.DataTable = true;
           this.Detalles = false;
           this.submitted = false;
           this.Agregar = true;
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



  collapse(){
    this.Collapse= true;
    this.DataTable = false;
    this.Valor = "Agregar";
    this.Agregar= false;
    this.Detalles = false;
    this.Tabla = true;
}

   }

   