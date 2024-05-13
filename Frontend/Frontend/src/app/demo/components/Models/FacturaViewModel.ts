export class Factura{
    impu_Impuesto?:String;
    mtPag_Descripcion?:String;
    emple_Nombre?:String;
    clien_PrimerNombre?:String;
    fact_Id?:String;
    venen_Emitida: string;
}

export class FacturaEnviar {
    Clien_Id?:String;
    MtPag_Id?:String;
    Produ_Descripcion?:String;
    Vende_Cantidad?:String;
    Venen_Id?:String;
    Venen_Emitida: string;
}




export class FacturaDetalle {
    
    produ_Id?:string;
    vende_Id?:string;
    producto?:string;
    total_Cantidad?:string;
    precio_Unitario?:string;
    total?:string;
    cantidad?:string;
}



export class FacturaDetallesEnviar {
    Produ_Id?:String;
    Venen_Id?:String;
    Fact_Id?:String;
}



export class Fill {
    impu_Id: string;
    mepa_Id: string;
    empl_Id?:String;
    clie_Id?:string;
    venen_Id?:string;
    mtPag_Id?:string;
    clien_PrimerNombre?:string;
    clien_DNI : string;
    usuarioCreacion: string;
    usuarioModificacion: string;
    fechaCreacion : string;
    fechaModificacion : string;
    
}




export class Detalle{
    Produ_Descripcion?:String;
    Vende_Cantidad?:String;
    Venen_Id?:String;
    clie_Nombre?:String;
    fact_Id?:String;
}
