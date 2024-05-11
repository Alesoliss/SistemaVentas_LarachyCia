export class CategoriasViewModel {
    categ_Id!: number;
    categ_Descripcion!: string;
    cate_ImagenUrl!: string;
    categ_UsuarioCreacion!: number;
    categ_FechaCreacion!: Date;
    categ_UsuarioModificacion?: number | null;
    categ_FechaModificacion?: Date | null;
    categ_Estado?: boolean | null;
    usuarioCreacion?: string;
    usuarioModificacion?: string;
}

export class Fill {
    categ_Id!: string;
    categ_Descripcion!: string;
    cate_ImagenUrl!: string;
    categ_UsuarioCreacion!: string;
    categ_FechaCreacion!: Date;
    categ_UsuarioModificacion?: number | null;
    categ_FechaModificacion?: Date | null;
    categ_Estado?: boolean | null;
    usuarioCreacion?: string;
    usuarioModificacion?: string;
}