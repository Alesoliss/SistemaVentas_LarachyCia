export class UsuariosViewModel {
    usuar_Id?: string;
    usuar_Usuario!: string;
    usuar_Contrasena!: string;
    emple_Id!: number;
    roles_Id!: number;
    usuar_Admin!: boolean;
    usuar_UltimaSesion?: Date | null;
    usuar_UsuarioCreacion!: number;
    usuar_FechaCreacion!: Date;
    usuar_UsuarioModificacion?: number | null;
    usuar_FechaModificacion?: Date | null;
    usuar_Estado?: boolean | null;
    usuarioCreacion!: string;
    usuarioModificacion!: string;
    empleado!: string;
    roles_Descripcion!: string;
    perso_NombreCompleto!: string;
    perso_Id!: number;
    usuar_Tipo!: boolean;
}

export class Fill {
    usuar_Id?: string;
    usuar_Usuario!: string;
    usuar_Contrasena!: string;
    emple_Id!: string;
    roles_Id!: string;
    usuar_Admin!: string;
    usuar_UltimaSesion?: Date | null;
    usuar_UsuarioCreacion!: number;
    usuar_FechaCreacion!: Date;
    usuar_UsuarioModificacion?: number | null;
    usuar_FechaModificacion?: Date | null;
    usuar_Estado?: boolean | null;
    usuarioCreacion!: string;
    usuarioModificacion!: string;
    empleado!: string;
    roles_Descripcion!: string;
    perso_NombreCompleto!: string;
    perso_Id!: string;
    usuar_Tipo!: boolean;
    fechaCreacion?: string;
    fechaModificacion?: string;
}
export class UsuarioEnviar {
    usuar_Id?: string;  // Cambiado de String a string
    Usuar_Usuario: string;
    Usuar_Contrasena: string;
    Perso_Id: string;
    Roles_Id: string;
    Usuar_Admin: string; 
}
