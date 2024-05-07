export class EmpleadoViewModel {
    Emple_Id!: number;
    Emple_DNI!: Number;
    Emple_PrimerNombre!: String;
    Emple_SegundoNombre!: String;
    Emple_PrimerApellido!: String;
    Emple_SegundoApellido!: String;
    Emple_Sexo!: string;
    Estad_Id!: Number;
    Emple_Telefono!: String;
    Emple_Correo!: String;
    Emple_Direccion!: String;
    Munic_Id!: Number;
    Cargo_Id!: Number;
    Emple_UsuarioCreacion!: number;
    Emple_FechaCreacion!: Date;
    Emple_UsuarioModificacion?: number | null;
    Emple_FechaModificacion?: Date | null;
    Emple_Estado?: boolean | null;
    Sucur_Id!: Number;
    UsuarioCreacion?: string;
    UsuarioModificacion?: string;
    Munic_Descripcion?: string;
    Sucur_Descripcion?: string;
    Cargo_Descripcion?: string;

}
