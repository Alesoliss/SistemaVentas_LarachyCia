export class Proveedor{
    prov_Id?:String;
    prov_Proveedor?:String;
    prov_Telefono?:String;
    muni_Municipio?:String;
}
export class ProveedorEnviar {
    Prov_Id: String;
    Prov_Proveedor: string;
    Prov_Telefono: string;
    Muni_Codigo: string;
}

export class dropProveedor{
    value?:String;
    text?:String;
}
export class Fill {
    prov_Id: string;
    prov_Proveedor: string;
    prov_Telefono: string;
    depa_Codigo: string;
    muni_Municipio?:String;
    muni_Codigo: string;
    departamento: string;
    usuarioCreacion: string;
    usuarioModificacion: string;
    fechaCreacion : string;
    fechaModificacion : string;
}