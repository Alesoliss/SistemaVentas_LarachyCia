export class DepartamentosViewModel {
    depar_Id!: string;
    depar_Descripcion!: string;
    depar_UsuarioCreacion!: number;
    depar_FechaCreacion!: Date;
    depar_UsuarioModificacion?: number | null;
    depar_FechaModificacion?: Date | null;
    depar_Estado?: boolean | null;
    usuarioCreacion?: string;
    usuarioModificacion?: string;
}

export class Fill {
    depar_Id!: string;
    depar_Descripcion!: string;
    depar_UsuarioCreacion!: number;
    depar_FechaCreacion!: Date;
    depar_UsuarioModificacion?: number | null;
    depar_FechaModificacion?: Date | null;
    depar_Estado?: boolean | null;
    usuarioCreacion?: string;
    usuarioModificacion?: string;
}