export class Factura{
    impu_Impuesto?:String;
    mepa_Metodo?:String;
    empl_Nombre?:String;
    clie_Nombre?:String;
    fact_Id?:String;
}
// Impue_Id
export class FacturaEnviar {

    Sucur_Id?:String;
    Clien_Id?:String;
    MtPag_Id?:String;
    Venen_Id?:String;
    Empl_Id?:String;
   
}



export class FacturaDetallesEnviar {
    Produ_Id?:String;
    Vende_Cantidad?:String;
    Venen_Id?:String;
}



export class Fill {
    venen_Id: String;

    sucur_Id: String;
    venen_DireccionEnvio: String;
    venen_FechaPedido: String;
    venen_UsuarioCreacion: String;
    venen_FechaCreacion: Date;
    venen_UsuarioModificacion?: String;
    venen_FechaModificacion?: String;
    venen_Estado?: String;
    mtPag_Id: String;
    venen_NroTarjeta: String;
    emple_Id: String;
    empleado?: String;
    mtPag_Descripcion?: String;
  
    // Detalle
    vende_Id?: String;
    produ_Id: String;
    vende_Cantidad: String;
    vende_UsuarioCreacion?: String;
    vende_FechaCreacion?: String;
    vende_UsuarioModificacion?:  String;
    vende_FechaModificacion?: String;
    vende_Estado?: String;
  
    // Productos
    produ_Descripcion?: String;
    produ_Existencia?: number;
    unida_Id?: String;
    produ_PrecioCompra?: number;
    produ_PrecioVenta?: number;
    impue_Id?: number;
    categ_Id?: number;
    prove_Id?: number;
    produ_UsuarioCreacion?: number;
    produ_FechaCreacion?: Date;
    produ_UsuarioModificacion?: number | null;
    produ_FechaModificacion?: Date | null;
    produ_Estado?: boolean | null;
    produ_ImagenUrl?: string;
    unida_Descripcion?: string;
    prove_Marca?: string;
    impue_Descripcion?: number;
    usuarioCreacion?: string;
    usuarioModificacion?: string;
    categ_Descripcion?: string;
    sucur_Descripcion?: string;
    cliente?: string;
  
    // Cliente
    clien_Id: number;
    clien_PrimerNombre?: string;
    clien_SegundoNombre?: string;
    clien_PrimerApellido?: string;
    clien_SegundoApellido?: string;
    clien_Sexo?: string;
    estad_Id?: number;
    clien_Telefono?: string;
    clien_Correo?: string;
    munic_Id?: string;
    clien_Direccion?: string;
    clien_UsuarioCreacion?: number;
    clien_UsuarioModificacion?: number | null;
    clien_FechaModificacion?: Date | null;
    clien_FechaCreacion?: Date | null;
    munic_Descripcion?: string;
    estad_Descripcion?: string;
}