export class Usuario{
    usua_Id?:String;
    usua_Usuario?:String;
    usua_Administradores?:String;
    role_Rol?:String;
    empl_Nombre?:String;
}
export class UsuarioEnviar {
    Usua_Id?:String;
    Usua_Usuario: string;
    Usua_Contraseña: string;  
    Usua_Administrador: string;  
    Empl_Id: string;  
    Role_Id: string;  

}

export class Fill {
    usua_Id: string;
    usua_Usuario: string;
    usua_Administradores?:String;
    usua_Administrador?:String;
    role_Rol:String;
    empl_Nombre:String;
    empl_Id:String;
    role_Id:String;
    usuarioCreacion: string;
    usuarioModificacion: string;
    fechaCreacion : string;
    fechaModificacion : string;
}
