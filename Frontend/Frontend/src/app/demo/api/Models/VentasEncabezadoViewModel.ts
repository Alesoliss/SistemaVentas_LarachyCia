export interface VentasEncabezadoViewModel {
    // Encabezado
    venen_Id: number;

    sucur_Id: number;
    venen_DireccionEnvio: string;
    venen_FechaPedido: Date;
    venen_UsuarioCreacion: number;
    venen_FechaCreacion: Date;
    venen_UsuarioModificacion?: number | null;
    venen_FechaModificacion?: Date | null;
    venen_Estado?: boolean | null;
    mtPag_Id: number;
    venen_NroTarjeta: string;
    emple_Id: number;
    empleado?: string;
    mtPag_Descripcion?: string;
  
    // Detalle
    vende_Id?: number;
    produ_Id: number;
    vende_Cantidad: number;
    vende_UsuarioCreacion?: number;
    vende_FechaCreacion?: Date;
    vende_UsuarioModificacion?: number | null;
    vende_FechaModificacion?: Date | null;
    vende_Estado?: boolean | null;
  
    // Productos
    produ_Descripcion?: string;
    produ_Existencia?: number;
    unida_Id?: number;
    produ_PrecioCompra?: number;
    produ_PrecioVenta?: number;
    impue_Id?: number;
    categ_Id?: number;
    prove_Id?: number;
    produ_UsuarioCreacion?: number;
    produ_FechaCreacion?: Date;
    produ_UsuarioModificacion?: number | null;
    produ_FechaModificacion?: Date | null;
    produ_Estado?: boolean | null;
    produ_ImagenUrl?: string;
    unida_Descripcion?: string;
    prove_Marca?: string;
    impue_Descripcion?: number;
    usuarioCreacion?: string;
    usuarioModificacion?: string;
    categ_Descripcion?: string;
    sucur_Descripcion?: string;
    cliente?: string;
  
    // Cliente
    clien_Id: number;
    clien_PrimerNombre?: string;
    clien_SegundoNombre?: string;
    clien_PrimerApellido?: string;
    clien_SegundoApellido?: string;
    clien_Sexo?: string;
    estad_Id?: number;
    clien_Telefono?: string;
    clien_Correo?: string;
    munic_Id?: string;
    clien_Direccion?: string;
    clien_UsuarioCreacion?: number;
    clien_UsuarioModificacion?: number | null;
    clien_FechaModificacion?: Date | null;
    clien_FechaCreacion?: Date | null;
    munic_Descripcion?: string;
    estad_Descripcion?: string;
  }
  