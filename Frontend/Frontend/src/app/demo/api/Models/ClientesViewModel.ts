export class ClienteViewModel {
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
    depar_Id!: string;
    depa_Departamento?: string;
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
    

    clien_Id!: string;
    clien_PrimerNombre!: string;
    clien_SegundoNombre!: string;
    clien_PrimerApellido!: string;
    clien_SegundoApellido!: string;
    clien_Sexo!: string;
    estad_Id!: string;
    clien_Telefono!: string;
    clien_Correo!: string;
    munic_Id!: string;
    clien_Direccion!: string;
    depar_Id!: string;
  

}

export class Fill {
    clien_Id!: string;
    clien_PrimerNombre!: string;
    clien_SegundoNombre!: string;
    clien_PrimerApellido!: string;
    clien_SegundoApellido!: string;
    clien_Sexo!: string;
    estad_Id!: string;
    clien_Telefono!: string;
    clien_Correo!: string;
    munic_Id!: string;
    munic_Descripcion!: string;
    depar_Id!: string;
    depa_Departamento?: string;
    estad_Descripcion!: string;
    clien_Direccion!: string;
    clien_UsuarioCreacion!: number;
    clien_UsuarioModificacion?: number | null;
    clien_FechaModificacion?: Date | null;
    clien_FechaCreacion?: Date | null;
    usuarioCreacion?: string;
    usuarioModificacion?: string;
}