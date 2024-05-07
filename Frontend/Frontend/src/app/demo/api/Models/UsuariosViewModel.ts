export class UsuariosViewModel {
    usuar_Id!: number;
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
