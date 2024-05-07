import { DecimalPipe } from "@angular/common";

export class ProductosViewModel {
    Produ_Id!: number;
    Produ_Descripcion!: String;
    Produ_Existencia!: String;
    Produ_PrecioCompra!: String;
    Produ_PrecioVenta!: String;
    Impue_Id!: number;
    Unida_Id!: Number;
    Prove_Id!: number;
    Sucur_Id!: Number;
    Produ_UsuarioCreacion!: number;
    Produ_FechaCreacion!: Date;
    Produ_UsuarioModificacion?: number | null;
    Produ_FechaModificacion?: Date | null;
    Produ_Estado?: boolean | null;
    Produ_ImagenUrl?: string;
    Unida_Descripcion?: string;
    Prove_Marca?: string;
    Impue_Descripcion?: string;
    UsuarioCreacion?: string;
    UsuarioModificacion?: string;
    Categ_Descripcion?: string;
    Sucur_Descripcion?: string;
    Vende_Id?: number;
    Vende_Cantidad?: string;
    Vende_UsuarioCreacion!: number;
    Vende_FechaCreacion!: Date;
    Vende_UsuarioModificacion?: number | null;
    Vende_FechaModificacion?: Date | null;
    Vende_Estado?: boolean | null;
    cliente?: string;
}

export class Fill {
    Produ_Id!: number;
    Produ_Descripcion!: String;
    Produ_Existencia!: String;
    Produ_PrecioCompra!: String;
    Produ_PrecioVenta!: String;
    Impue_Id!: number;
    Unida_Id!: Number;
    Prove_Id!: number;
    Sucur_Id!: Number;
    Produ_UsuarioCreacion!: number;
    Produ_FechaCreacion!: Date;
    Produ_UsuarioModificacion?: number | null;
    Produ_FechaModificacion?: Date | null;
    Produ_Estado?: boolean | null;
    Produ_ImagenUrl?: string;
    Unida_Descripcion?: string;
    Prove_Marca?: string;
    Impue_Descripcion?: string;
    UsuarioCreacion?: string;
    UsuarioModificacion?: string;
    Categ_Descripcion?: string;
    Sucur_Descripcion?: string;
    Vende_Id?: number;
    Vende_Cantidad?: string;
    Vende_UsuarioCreacion!: number;
    Vende_FechaCreacion!: Date;
    Vende_UsuarioModificacion?: number | null;
    Vende_FechaModificacion?: Date | null;
    Vende_Estado?: boolean | null;
    cliente?: string;
}