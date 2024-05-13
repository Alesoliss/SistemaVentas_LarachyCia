import { an } from "@fullcalendar/core/internal-common";

export class Rol{
    roles_Id?:String;
    roles_Descripcion?:String;
}

export class RolEnviar {
    Rol_Id?:String;
    txtRol: string;
    pantallasSeleccionadas: any;
}
export class dropRol{
    value?:String;
    text?:String;
}

export class Fill {
    roles_Id: string;
    pant_Id: string;
    roles_Descripcion: string;
    usuarioCreacion: string;
    usuarioModificacion: string;
    fechaCreacion : string;
    fechaModificacion : string;
}