export class EmpleadoViewModel {
    emple_Id!: number;
    emple_DNI!: Number;
    emple_PrimerNombre!: String;
    emple_SegundoNombre!: String;
    emple_PrimerApellido!: String;
    emple_SegundoApellido!: String;
    emple_Sexo!: string;
    estad_Id!: Number;
    emple_Telefono!: String;
    emple_Correo!: String;
    emple_Direccion!: String;
    munic_Id!: string;
    depar_Id!: string;
    cargo_Id!: Number;
    emple_UsuarioCreacion!: number;
    emple_FechaCreacion!: Date;
    emple_UsuarioModificacion?: number | null;
    emple_FechaModificacion?: Date | null;
    emple_Estado?: boolean | null;
    sucur_Id!: Number;
    usuarioCreacion?: string;
    usuarioModificacion?: string;
    munic_Descripcion?: string;
    sucur_Descripcion?: string;
    cargo_Descripcion?: string;
    estad_Descripcion?: string;
    depa_Departamento?: string;
}
export class EmpleadoEnviar {
    

    emple_Id!: string;
    emple_DNI!: Number;
    emple_PrimerNombre!: String;
    emple_SegundoNombre!: String;
    emple_PrimerApellido!: String;
    emple_SegundoApellido!: String;
    emple_Sexo!: string;
    estad_Id!: Number;
    emple_Telefono!: String;
    emple_Correo!: String;
    emple_Direccion!: String;
    munic_Id!: Number;
    cargo_Id!: Number;
    sucur_Id!: Number;
    depar_Id!: string;


}

export class Fill {
    emple_Id!: string;
    emple_DNI!: string;
    emple_PrimerNombre!: string;
    emple_SegundoNombre!: String;
    emple_PrimerApellido!: String;
    emple_SegundoApellido!: String;
    emple_Sexo!: string;
    estad_Id!: Number;
    emple_Telefono!: String;
    emple_Correo!: String;
    emple_Direccion!: String;
    munic_Id!: string;
    depar_Id!: string;
    cargo_Id!: Number;
    emple_UsuarioCreacion!: number;
    emple_FechaCreacion!: Date;
    emple_UsuarioModificacion?: number | null;
    emple_FechaModificacion?: Date | null;
    emple_Estado?: boolean | null;
    sucur_Id!: Number;
    usuarioCreacion?: string;
    usuarioModificacion?: string;
    munic_Descripcion?: string;
    sucur_Descripcion?: string;
    cargo_Descripcion?: string;
    estad_Descripcion?: string;
    depa_Departamento?: string;
}