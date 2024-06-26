export class EstadosCivilesViewModel {
    estad_Id: string;
    estad_Descripcion!: string;
    estad_UsuarioCreacion!: number;
    estad_FechaCreacion!: Date;
    estad_UsuarioModificacion?: number | null;
    estad_FechaModificacion?: Date | null;
    estad_Estado?: boolean | null;
    usuarioCreacion?: string;
    usuarioModificacion?: string;
}

export class Fill {
    estad_Id!: string;
    estad_Descripcion!: string;
    estad_UsuarioCreacion!: number;
    estad_FechaCreacion!: Date;
    estad_UsuarioModificacion?: number | null;
    estad_FechaModificacion?: Date | null;
    estad_Estado?: boolean | null;
    usuarioCreacion?: string;
    usuarioModificacion?: string;
    fechaCreacion?: string;
    fechaModificacion?: string;
}
export class dropEstadoCivil{
    value?:String;
    text?:String;
}

