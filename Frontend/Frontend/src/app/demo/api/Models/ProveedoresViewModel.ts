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
    depar_Id: string;
}

export class ProveedorEnviar {
    

    Prove_Id!: string;
    Prove_Marca!: string;
    Prove_ContactoPrimerNombre!: string;
    Prove_ContactoSegundoNombre!: string;
    Prove_ContactoPrimerApellido!: string;
    Prove_ContactoSegundoApellido!: string;
    Munic_Id!: string;
    Prove_Direccion!: string;
    Prove_Telefono!: string;
    Prove_Correo!: string;
    Prove_Notas!: string;


  

}

export class Fill {
    prove_Id!: string;
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
  prov_Id: any;
  prov_Proveedor: any;
  prov_Telefono: string;
  depa_Departamento: any;
  muni_Municipio: any;
  fechaCreacion: any;
  fechaModificacion: any;
  depar_Id: string;
  muni_Codigo: any;
}