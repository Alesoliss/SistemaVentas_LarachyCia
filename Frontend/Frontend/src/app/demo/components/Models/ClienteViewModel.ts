export class Cliente{
    clien_Id!: number;
    clien_PrimerNombre!: string;
    clien_SegundoNombre!: string;
    clien_PrimerApellido!: string;
    clien_SegundoApellido!: string;
    clien_Sexo!: string;
    estad_Id!: number;
    clien_Telefono!: string;
    clien_Correo!: string;
    munic_Id!: string;
    clien_DNI!: string;

    munic_Descripcion!: string;
    estad_Descripcion!: string;
    clien_Direccion!: string;
    clien_UsuarioCreacion!: number;
    clien_UsuarioModificacion?: number | null;
    clien_FechaModificacion?: Date | null;
    clien_FechaCreacion?: Date | null;
    usuarioCreacion?: string;
    usuarioModificacion?: string;
}

export class ClienteEnviar {
    Clie_Id: string;
    Clie_DNI?:String;
    Clie_Nombre: string;
    Clie_Apellido: string;
    Clie_FechaNac: string;
    Clie_Sexo: string;
    Muni_Codigo: string;
    Esta_Id: string;

}


export class Fill {
    clie_Id: string;
    clie_Nombre: string;
    clie_Apellido?:String;
    clie_FechaNac?:String;
    clie_Sexo?:String;
    muni_Codigo?:String;
    muni_Municipio?:String;
    carg_Cargo: string;
    esta_Id?:String;
    esta_EstadoCivil?:String;
    clie_DNI?:String;
    depa_Codigo?:String;
    depa_Departamento?:String;
    usuarioCreacion: string;
    usuarioModificacion: string;
    fechaCreacion : string;
    fechaModificacion : string;
}