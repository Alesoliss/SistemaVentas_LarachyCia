export class MetodosPagoViewModel {
    mtPag_Id!: number;
    mtPag_Descripcion!: string;
    mtPag_UsuarioCreacion!: number;
    mtPag_FechaCreacion!: Date;
    mtPag_UsuarioModificacion?: number | null;
    mtPag_Estado?: boolean | null;
    mtPag_FechaModificacion?: Date | null;
    usuarioCreacion?: string;
    usuarioModificacion?: string;
}

export class MetodoPagoEnviar {
    mtPag_Id:number;
    mtPag_Descripcion: string;
}

export class Fill {
    mtPag_Id!: number;
    mtPag_Descripcion!: string;
    usuarioCreacion?: string;
    usuarioModificacion?: string;
    mtPag_FechaCreacion!: Date;
    mtPag_FechaModificacion?: Date | null;
}