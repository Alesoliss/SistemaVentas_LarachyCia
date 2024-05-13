export class Cargo{
    carg_Id?:String;
    carg_Cargo?:String;
}


export class CargoEnviar {
    Carg_Id: string;

    Carg_Cargo: string;
}


export class dropCargo{
    value?:String;
    text?:String;
}


export class Fill {
    carg_Id: string;
    carg_Cargo: string;
    usuarioCreacion: string;
    usuarioModificacion: string;
    fechaCreacion : string;
    fechaModificacion : string;
}