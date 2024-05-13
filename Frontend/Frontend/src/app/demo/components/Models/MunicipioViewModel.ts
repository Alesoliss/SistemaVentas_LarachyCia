export class Municipio{
    muni_Codigo?:String;
    muni_Municipio?:String;
    departamento?:String;
}


export class MunicipioEnviar {
    Muni_Codigo: string;
    Muni_Municipio: string;
    Depa_Codigo: string;
}

export class Fill {
    muni_Codigo: string;
    muni_Municipio: string;
    depa_Codigo: string;
    departamento: string;
    usuarioCreacion: string;
    usuarioModificacion: string;
    fechaCreacion : string;
    fechaModificacion : string;
}

export class dropMunicipio{
    value?:String;
    text?:String;
}
