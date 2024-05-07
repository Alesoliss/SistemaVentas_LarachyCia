export class PantallaViewModel {
    panta_Id!: number;
    panta_Descripcion!: string;
    panta_UsuarioCreacion!: number;
    panta_FechaCreacion!: Date;
    panta_UsuarioModificacion?: number | null;
    panta_FechaModificacion?: Date | null;
    panta_Estado?: boolean | null;
    pantallasDescripcion!: string;
    pantallasID!: number[];
    usuarioCreacion!: string;
    usuarioModificacion!: string;
    numero!: number;
    pantID!: number;
    pantDescripcion!: string;
}
