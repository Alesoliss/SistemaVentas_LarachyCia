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
