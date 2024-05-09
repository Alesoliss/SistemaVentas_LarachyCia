export class MunicipiosViewModel {
    munic_Id!: string;
    munic_Descripcion!: string;
    depar_Id!: string;
    munic_UsuarioCreacion!: number;
    munic_FechaCreacion!: Date;
    munic_UsuarioModificacion?: number | null;
    munic_FechaModificacion?: Date | null;
    depar_Descripcion?: string;
    munic_Estado?: boolean | null;
    usuarioCreacion?: string;
    usuarioModificacion?: string;
}


export class Fill {
    munic_Id!: string;
    munic_Descripcion!: string;
    depar_Id!: string;
    munic_UsuarioCreacion!: number;
    munic_FechaCreacion!: string;
    munic_UsuarioModificacion?: number | null;
    munic_FechaModificacion?: string;
    depar_Descripcion?: string;
    munic_Estado?: boolean | null;
    usuarioCreacion?: string;
    usuarioModificacion?: string;
}
export class dropMunicipio{
    value?:String;
    text?:String;
}
