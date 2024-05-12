import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import { Fill, ProveedoresViewModel, ProveedorEnviar } from '../../../api/Models/ProveedoresViewModel';
import { ProveedoresServiceService } from '../../../api/Services/proveedores-service.service';
import { MensajeViewModel } from '../../../api/Models/MensajeViewModel';
import { FormGroup, FormControl,  Validators  } from '@angular/forms';
import { dropDepartamento } from '../../../api/Models/DepartamentosViewModel';
import { dropMunicipio } from '../../../api/Models/MunicipiosViewModel';
import { DepartamentoServiceService } from 'src/app/demo/api/Services/departamento-service.service';
import { MunicipiosServiceService } from 'src/app/demo/api/Services/municipios-service.service';
@Component({
  templateUrl: './list-proveedor.component.html',
  styleUrl: './list-proveedor.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class ListProveedorComponent implements OnInit{
  Proveedor!:ProveedoresViewModel[];
   
  MensajeViewModel!: MensajeViewModel[];
  submitted: boolean = false;
  loading: boolean = false;
  departamentos: any[] = [];
  municipios: any[] = [];
  rol: any[] = [];
  fill: any[] = [];
  viewModel: ProveedorEnviar = new ProveedorEnviar();
  proveedorForm: FormGroup;
 
  @ViewChild('filter') filter!: ElementRef;

  selectedState: any = null;
  Collapse: boolean = false;
  DataTable: boolean = true;
  Detalles: boolean = false;
  Agregar: boolean = true;
  Contrasenas: boolean = true;
  Valor: string = "";
  staticData = [{}];
  Id_Municipio: string = "";
  deleteProductDialog: boolean = false;
  //Detalle
  Detalle_Id: string = "";
  Detalle_Marca: string = "";
  Detalle_ContactoPrimerNombre: string = "";
  Detalle_ContactoSegundoNombre: string = "";
  Detalle_ContactoPrimerApellido: string = "";
  Detalle_ContactoSegundoApellido: string = "";
  Munic_Id: string = "";
  Detalle_Direccion: string = "";
  Detalle_Telefono: string = "";
  Detalle_Correo: string = "";
  Detalle_Notas: string = "";
  Detalle_Codigo: any;
  Detalle_Proveedor: any;
  Detalle_Departamento: any;
  Detalle_Municipio: any;
  UsuarioCreacion: string;
  UsuarioModificacion: string;
  FechaCreacion: any;
  FechaModificacion: any;
  ID: any;
  MunicipioCodigo: any;

  constructor(private service: ProveedoresServiceService, private router: Router,   private messageService: MessageService,
    private DepartamentoServiceService: DepartamentoServiceService, private MunicipiosServiceService: MunicipiosServiceService
  
  ) { }


  ngOnInit(): void {
    this.proveedorForm = new FormGroup({
     
   
    
     
      Prove_Marca: new FormControl("", Validators.required),
      Prove_ContactoPrimerNombre: new FormControl("", Validators.required),
      Prove_ContactoSegundoNombre: new FormControl("", Validators.required),
      Prove_ContactoPrimerApellido: new FormControl("", Validators.required),
      Prove_ContactoSegundoApellido: new FormControl("", Validators.required),
  
      Prove_Direccion: new FormControl("", Validators.required),
      Prove_Telefono: new FormControl("", Validators.required),
      Prove_Correo: new FormControl("", Validators.required),
      Prove_Notas: new FormControl("", Validators.required),
      Depa_Codigo: new FormControl("0", [Validators.required]),
      Munic_Id: new FormControl("0", Validators.required),
      
    });
    this.service.getDropDownsDepartamentos().subscribe((data: dropDepartamento[]) => {
    console.log(data);
    this.departamentos = data;
    });
    this.service.getProveedor().subscribe((data: any)=>{
        console.log(data);
        this.Proveedor = data;
      },error=>{
        console.log(error);
      });
   }
   onDepartmentChange(departmentId) {
    if (departmentId !== '0') {
      this.service.getMunicipios(departmentId).subscribe(
        (data: any) => {
          this.municipios = data; 
          this.proveedorForm.get('Munic_Id').setValue('0'); 
        },
        error => {
          console.error('Error fetching municipios:', error);
        }
      );
    } else {
      this.municipios = []; // Clear municipios if the department is invalid or reset
    }
  }
   collapse(){
    this.Collapse= true;
    this.DataTable = false;
    this.Valor = "Agregar";
    this.Agregar= false;
    this.Detalles = false;
}
detalles(codigo){
    this.Collapse= false;
    this.DataTable = false;
    this.Agregar= false;
    this.Detalles = true;
    this.service.getFill(codigo).subscribe({
      next: (data: Fill) => {
        this.Detalle_Id = data.prove_Id ;
        this.Detalle_Marca = data.prove_Marca ;
        this.Detalle_ContactoPrimerNombre=data.prove_ContactoPrimerNombre ;
        this.Detalle_ContactoSegundoNombre= data.prove_ContactoSegundoNombre;
        this.Detalle_ContactoPrimerApellido = data.prove_ContactoPrimerApellido;
        this.Detalle_ContactoSegundoApellido = data.prove_ContactoSegundoApellido;
        this.Munic_Id = data.munic_Id;
        this.Detalle_Direccion = data.prove_Direccion;
        this.Detalle_Telefono = data.prov_Telefono;
        this. Detalle_Correo = data.prove_Correo;
        this.Detalle_Notas = data.prove_Notas;
      }
    });
    this.ngOnInit();
}
//Cerrar Collapse y reiniciar el form
cancelar(){
    this.Collapse= false;
    this.DataTable = true;
    this.Detalles = false;
    this.ngOnInit();
    this.submitted = false;
    this.Agregar= true;
    this.Valor = "";
}

validarTexto(event: KeyboardEvent) {
  if (!/^[-a-zA-Z\s-]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
  }
}
ValidarNumero(event: KeyboardEvent) {
  if (!/^[0-9\s-]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
  }
}
onSubmit() {
  if (this.proveedorForm.valid && this.proveedorForm.get('Depa_Codigo').value !== '0' && this.proveedorForm.get('Munic_Id').value !== '0') {
     this.viewModel = this.proveedorForm.value;
     if (this.Valor == "Agregar") {
      this.service.EnviarProveedor(this.viewModel).subscribe((data: MensajeViewModel[]) => {
          if(data["message"] == "Operación completada exitosamente."){
          this.ngOnInit();
           this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
           this.Collapse= false;
           this.DataTable = true;
           this.submitted = false;
           this.Detalles = false;
           this.Agregar= true;
          }else{
           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro insertar', life: 3000 });
          }
       })
     } else {
      this.viewModel.Prove_Id = this.ID
          this.service.ActualizarProveedor(this.viewModel).subscribe((data: MensajeViewModel[]) => {
          if(data["message"] == "Operación completada exitosamente."){
            this.ngOnInit();
           this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Actualizado con Exito', life: 3000 });
           this.Collapse= false;
           this.DataTable = true;
           this.Detalles = false;
           this.submitted = false;
           this.Agregar= true;
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


  municipioSeleccionadoId: string = '';

  deleteSelectedProducts(municipioId: string): void {
    console.log('ID:', municipioId);
    // Almacena el ID del municipio seleccionado
    this.municipioSeleccionadoId = municipioId;
    // Muestra el modal de confirmación
    this.deleteProductDialog = true;
}

confirmDelete(): void {
  if (this.municipioSeleccionadoId) {
      this.service.EliminarProveedor(this.municipioSeleccionadoId).subscribe(
          (response) => {
              console.log('Proveedor eliminado exitosamente', response);

              // Añadimos un mensaje de éxito aquí para verificar si se ejecuta
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Municipio eliminado correctamente' });
              this.DataTable = true;
              this.Collapse= false;
              // this.get();
              this.municipioSeleccionadoId = '';
          },
          (error) => {
            this.messageService.add({ severity: 'Error', summary: 'Danger Message', detail: 'El Municipio no se eliminado correctamente' });
              this.municipioSeleccionadoId = '';
          }
      );
  } else {
      console.error('ID del municipio seleccionado está vacío');
  }
  this.deleteProductDialog = false;
}

Fill(codigo) {
    this.service.getFill(codigo).subscribe({
        next: (data: Fill) => {
          this.proveedorForm = new FormGroup({
            prove_Id: new FormControl(data.prove_Id, Validators.required),
            Prove_Telefono: new FormControl(data.prove_Telefono, Validators.required),
            Depa_Codigo: new FormControl(data.depar_Id, [Validators.required]),
          
            Prove_Marca: new FormControl(data.prove_Marca, Validators.required),
            Prove_ContactoPrimerNombre: new FormControl(data.prove_ContactoPrimerNombre, Validators.required),
            Prove_ContactoSegundoNombre: new FormControl(data.prove_ContactoSegundoNombre, Validators.required),
            Prove_ContactoPrimerApellido: new FormControl(data.prove_ContactoPrimerApellido, Validators.required),
            Prove_ContactoSegundoApellido: new FormControl(data.prove_ContactoSegundoApellido, Validators.required),
            Munic_Id: new FormControl(data.munic_Id, Validators.required),
            Prove_Direccion: new FormControl(data.prove_Direccion, Validators.required),
            Prove_Correo: new FormControl(data.prove_Correo, Validators.required),
            Prove_Notas: new FormControl(data.prove_Notas, Validators.required)
           
            
            
          });
          this.MunicipioCodigo = data.munic_Id;
          console.log(this.MunicipioCodigo);
          this.service.getMunicipios(data.depar_Id).subscribe(
            (data: any) => {
              this.municipios = data; 
              this.proveedorForm.get('Munic_Id').setValue(this.MunicipioCodigo); 
            }
          );
            this.ID = data.prov_Id;
            this.Collapse= true;
            this.DataTable = false;
            this.Agregar = false;
            this.Detalles = false;
            this.Contrasenas = false;
            this.Valor = "Editar";
        }
      });

}
}
