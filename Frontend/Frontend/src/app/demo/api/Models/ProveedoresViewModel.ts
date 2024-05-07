export class ProveedoresViewModel {
    prove_Id!: number;
    prove_Marca!: string;
    prove_ContactoPrimerNombre!: string;
    prove_ContactoSegundoNombre!: string;
    prove_ContactoPrimerApellido!: string;
    prove_ContactoSegundoApellido!: string;
    munic_Id!: string;
    prove_Direccion!: string;
    prove_Telefono!: string;
    prove_Correo!: string;
    prove_Notas!: string;
    prove_UsuarioCreacion!: number;
    prove_FechaCreacion!: Date;
    prove_UsuarioModificacion?: number | null;
    prove_FechaModificacion?: Date | null;
    prove_Estado?: boolean | null;
    munic_Descripcion?: string;
    usuarioCreacion?: string;
    usuarioModificacion?: string;
}
