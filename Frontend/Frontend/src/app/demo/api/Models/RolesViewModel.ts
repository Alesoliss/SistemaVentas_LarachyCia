import { PantallaViewModel } from '../Models/PantallaViewModel'; // Asegúrate de importar la clase PantallaViewModel si es necesario

export class RolesViewModel {
    roles_Id!: number;
    roles_Descripcion!: string;
    roles_UsuarioCreacion!: number;
    roles_FechaCreacion!: Date;
    roles_UsuarioModificacion?: number | null;
    roles_FechaModificacion?: Date | null;
    roles_Estado?: boolean | null;
    scoop!: number;
    pantallas?: PantallaViewModel[]; // Asegúrate de importar la clase PantallaViewModel si es necesario
    pantallasID?: number[];
    resultado!: number;
    nul!: string;
    usuarioCreacion!: string;
    usuarioModificacion!: string;
    pantID!: number;
    pantDescripcion!: string;
}
