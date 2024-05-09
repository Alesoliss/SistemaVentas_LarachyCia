export class CargosViewModel {
    cargo_Id!: number;
    cargo_Descripcion!: string;
    cargo_UsuarioCreacion!: number;
    cargo_FechaCreacion!: Date;
    cargo_UsuarioModificacion?: number | null;
    cargo_FechaModificacion?: Date | null;
    cargo_Estado?: boolean | null;
    usuarioCreacion?: string;
    usuarioModificacion?: string;
}

export class Fill {
    cargo_Id!: number;
    cargo_Descripcion!: string;
    cargo_UsuarioCreacion!: number;
    cargo_FechaCreacion!: Date;
    cargo_UsuarioModificacion?: number | null;
    cargo_FechaModificacion?: Date | null;
    cargo_Estado?: boolean | null;
    usuarioCreacion?: string;
    usuarioModificacion?: string;
}

export class dropCargo{
    value?:String;
    text?:String;
}
