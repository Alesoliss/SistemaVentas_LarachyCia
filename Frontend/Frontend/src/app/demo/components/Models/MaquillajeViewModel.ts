export class Maquillaje{
    maqu_Id?:String;
    maqu_Nombre?:String;
    maqu_Stock?:String;
    maqu_PrecioCompra?:String;
    maqu_PrecioVenta?:String;
    maqu_PrecioMayor?:String;
    prov_Proveedor?:String;
    maqu_Imagen?:string;
    marc_Marca?:String;
}
export class dropMaqui{
    value?:String;
    text?:String;
}
export class MaquillajeEnviar {
    Maqu_Id?:String;
    Maqu_Nombre: string;
    Maqu_PrecioCompra: string;
    Maqu_PrecioVenta: string;
    Maqu_PrecioMayor: string;
    Maqu_Stock?:String;
    Maqu_Imagen: string;
    Prov_Id: string;
    Marc_Id: string;


}

export class Fill {
    maqu_Id: string;
    maqu_Stock?:String;
    maqu_Nombre: string;
    maqu_PrecioCompra?:String;
    maqu_PrecioVenta?:String;
    maqu_PrecioMayor?:String;
    maqu_Imagen: string;
    marc_Id?:String;
    marc_Marca?:String;
    prov_Id?:String;
    prov_Proveedor?:String;
    usuarioCreacion: string;
    usuarioModificacion: string;
    fechaCreacion : string;
    fechaModificacion : string;
}