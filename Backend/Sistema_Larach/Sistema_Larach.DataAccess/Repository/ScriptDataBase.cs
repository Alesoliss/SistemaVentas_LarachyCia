using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.DataAccess.Repository
{
    public class ScriptDataBase
    {


        #region PantallasPorRoles
        public static string PanRo_Insertar = "[Acce].[sp_PantallasPorRol_crear]";
        public static string PanRo_Buscar = "[Acce].[sp_PantallasPorRol_buscar]";
        public static string PanRo_Eliminar = "[Acce].[sp_PantallasPorRol_eliminar]";
        #endregion



        #region Roles
        public static string Rol_Insertar = "[Acce].[sp_Roles_crear]";
        //pendiente
        public static string Rol_Eliminado = "Acce.Roles_Eliminado";
        public static string Rol_Listar = "[Acce].[sp_Roles_listar]";
        public static string Rol_Eliminar = "[Acce].[sp_Roles_eliminar]";
        public static string Rol_Actualizar = "[Acce].[sp_Roles_editar]";
        public static string Rol_Obtener = "[Acce].[sp_Roles_obtener]";
        public static string Rol_Llenar = "[Gene].[sp_Estados_llenar]";
        public static string Rol_ObtenerId = "Acce.sp_Roles_obtenerid";
        public static string Rol_Obtener_Rol = "[Acce].[sp_Roles_obtener_rol]";
        public static string Validar_Url = "Acce.sp_ValidarUrl";

        #endregion




        #region usuarios
        public static string Usuarios_Login = "[Acce].[SP_Usuarios_Login]";
        public static string Usuarios_Insertar = "Acce.SP_Usuarios_Insertar";
        public static string Usuarios_Listar = "Acce.SP_Usuarios_Lista";
        public static string Usuarios_Buscar = "[Acce].[SP_Usuarios_Buscar]";
        public static string Usuarios_Actualizar = "[Acce].[SP_Usuarios_Modificar]";
        public static string Usuarios_ActualizarContra = "[Acce].[SP_Usuarios_ReestablecerContrasenia]";
        public static string Usuarios_Delete = "[Acce].[SP_Usuarios_Eliminar]";
        public static string Usuarios_RolDDL = "Acce.SP_Roles_DropDownList";
        public static string Usuarios_EmpleadoDDL = "Gral.SP_Empleados_DropDownList";
        public static string Usuarios_Codigo = "[Acce].[SP_AgregarCodigoVerificacion]";
        public static string Usuario_MostrarCodigo = "[Acce].[SP_MostrarCodigoVerificacion]";
        public static string Usuarios_ValidarReestablecer = "[Acce].[SP_ValidarCorreo]";
        public static string Usua_Restablecer = "[Acce].[SP_Usuarios_ReestablecerContrasenia]";
        #endregion




        #region Empleados
        public static string EmpleadoInsertar = "[Cmrl].[sp_Empleados_Insertar]";
        public static string EmpleadoListar = "[Cmrl].[SP_Empleados_Lista]";
        public static string EmpleadoActualizar = "[Cmrl].[SP_Empleados_Actualizar]";
        public static string EmpleadoBuscar = "[Cmrl].[sp_Empleados_buscar]";
        public static string EmpleadoEliminar = "[Cmrl].[SP_Empleados_Eliminar]";
        #endregion



        #region Productos
        public static string Productos_Insertar = "[Cmrl].[SP_Productos_Insertar]";
        public static string Productos_ListadoPorCategoria = "[Cmrl].[SP_Productos_Lista]";
        public static string Productos_Buscar = "[Cmrl].[SP_Productos_Buscar]";
        public static string Productos_BuscarD = "[Cmrl].[sp_Productos_BuscarD]";
        public static string Productos_Actualizar = "[Cmrl].[sp_Productos_Actualizar]";
        public static string Productos_Delete = "[Cmrl].[SP_Productos_Eliminar]";
        public static string Productos_Listadogenral = "[Cmrl].[SP_Productos_ListdoGenerala]";


        //DDL
        public static string Impuestos_ddl = "Gral.SP_Impuestos_DDL";
        public static string Categorias_ddl = "Gral.SP_Categorias_DDL";
        public static string Proveedores_ddl = "Gral.SP_Provedores_DDL";
        public static string Sucursales_ddl = "Gral.SP_Sucursales_DDL";
        public static string Unidades_DDL = "Gral.SP_Unidades_DDL";




        #endregion



        #region Proveedor
        public static string ProveedorInsertar = "[Cmrl].[sp_Proveedores_Insertar]";
        public static string ProveedorListar = "[Cmrl].[SP_Proveedores_Lista]";
        public static string ProveedorActualizar = "[Cmrl].[sp_Proveedores_Actualizar]";
        public static string ProveedorBuscar = "[Cmrl].[sp_Proveedores_Buscar]";
        public static string ProveedorEliminar = "[Cmrl].[sp_Proveedores_Eliminar]";
        #endregion



        #region Sucursal
        public static string sucursalInsertar = "[Cmrl].[sp_Sucursales_Insertar]";
        public static string sucursalListar = "[Cmrl].[SP_Sucursales_Lista]";
        public static string sucursalActualizar = "[Cmrl].[sp_Sucursales_Actualizar]";
        public static string sucursalBuscar = "[Cmrl].[sp_Sucursales_Buscar]";
        public static string sucursalEliminar = "[Cmrl].[sp_Sucursales_Eliminar]";
        #endregion



        #region ComprasDetalle
        public static string CompraDetalle_Insertar = "[Comp].[SP_ComprasDetalle_Insertar]";
        public static string CompraDetalle_Listar = "[Comp].[SP_ComprasDetalle_Lista]";
        public static string CompraDetalle_Buscar = "[Comp].[SP_ComprasDetalle_Buscar]";
        public static string CompraDetalle_Actualizar = "[Comp].[SP_ComprasDetalle_Modificar]";
        public static string CompraDetalle_Delete = "[Comp].[SP_ComprasDetalle_Eliminar]";
        #endregion


        #region CompraEncabezado
        public static string CompraEncabezado_Insertar = "[Comp].[SP_ComprasEncabezado_Insertar]";
        public static string CompraEncabezado_Listar = "[Comp].[SP_ComprasEncabezado_Lista]";
        public static string CompraEncabezado_Buscar = "[Comp].[SP_ComprasEncabezado_Buscar]";
        public static string CompraEncabezado_Actualizar = "[Comp].[SP_ComprasEncabezado_Modificar]";
        public static string CompraEncabezado_Delete = "[Comp].[SP_ComprasEncabezado_Eliminar]";
        #endregion




        #region cargos 
        public static string cargoInsertar = "[Gral].[sp_Cargos_Insertar]";
        public static string cargoListar = "[Gral].[SP_Cargos_Lista]";
        public static string cargosActualizar = "[Gral].[sp_Cargos_Actualizar]";
        public static string cargoBuscar = "[Gral].[sp_Cargos_Buscar]";
        public static string cargoEliminar = "[Gral].[sp_Cargos_Eliminar]";
        #endregion




        #region categorias
        public static string categoriaInsertar = "[Gral].[sp_Categorias_Insertar]";
        public static string categoriaListar = "[Gral].[SP_Categorias_Lista]";
        public static string categoriaActualizar = "[Gral].[sp_Categorias_Actualizar]";
        public static string categoriabuscar = "[Gral].[sp_Categorias_Buscar]";
        public static string categoriaeliminar = "[Gral].[sp_Categorias_Eliminar]";
        #endregion



        #region Departamentos
        public static string deptoInsertar = "[Gral].[sp_Departamentos_Insertar]";
        public static string deptoListar = "Gral.SP_Departamentos_Lista";
        public static string deptoActualizar = "[Gral].[sp_Departamentos_Actualizar]";
        public static string deptoBuscar = "[Gral].[sp_Departamentos_Buscar]";
        public static string deptoeliminar = "[Gral].[sp_Departamentos_Eliminar]";


        #endregion






        #region EstadosCiviles
        public static string estadoInsertar = "[Gral].[sp_EstadosCiviles_Insertar]";
        public static string estadoListar = "[Cmrl].[SP_EstadosCiviles_Lista]";
        public static string estadoActuzalizar = "[Gral].[sp_EstadosCiviles_Actualizar]";
        public static string estadoBuscar = "[Gral].[sp_EstadosCiviles_Buscar]";
        public static string estadoeliminar = "[Gral].[sp_EstadosCiviles_Eliminar]";


        #endregion


        #region Impuestos
        public static string ImpuestoInsertar = "[Gral].[sp_Impuestos_Insertar]";
        public static string ImpuestoListar = "[Gral].[SP_Impuestos_Lista]";
        public static string ImpuestoActuzalizar = "[Gral].[sp_Impuestos_Actualizar]";
        public static string ImpuestoBuscar = "[Gral].[sp_Impuestos_Buscar]";
        public static string Impuestoeliminar = "[Gral].[sp_Impuestos_Eliminar]";
        #endregion


        #region MetodosPago
        public static string MetodoInsrtar = "[Gral].[sp_MetodosPago_Insertar]";
        public static string MetodoListar = "[Cmrl].[SP_MetodosPago_Lista]";
        public static string MetodoActuzalizar = "[Gral].[sp_MetodosPago_Actualizar]";
        public static string MetodoBuscar = "[Gral].[sp_MetodosPago_Buscar]";
        public static string MetodoEliminar = "[Gral].[sp_MetodosPago_Eliminar]";

        #endregion


        #region Municipios
        public static string MunicipiosInsertar = "[Gral].[sp_Municipios_Insertar]";
        public static string MunicipiosListar = "[Cmrl].[SP_Municipios_Lista]";
        public static string MunicipiosActualizar = "[Gral].[sp_Municipios_Actualizar]";
        public static string MunicipiosBuscar = "[Gral].[sp_Municipios_Buscar]";
        public static string MunicipiosEliminar = "[Gral].[sp_Municipios_Eliminar]";

        #endregion


        #region Unidades
        public static string UnidadesInsertar = "[Gral].[sp_Unidades_Insertar]";
        public static string UnidadesListar = "[Cmrl].[SP_Unidades_Lista]";
        public static string UnidadesActuzalizar = "[Gral].[sp_Unidades_Actualizar]";
        public static string UnidadesBuscar = "[Gral].[sp_Unidades_Buscar]";
        public static string UnidadesEliminar = "[Gral].[sp_Unidades_Eliminar]";

        #endregion

        #region Clientes
        public static string ClientesInsertar = "[Venta].[sp_Clientes_Insertar]";
        public static string ClientesListar = "[Venta].[SP_Clientes_Lista]";
        public static string ClientesActualizar = "[Venta].[sp_Clientes_Actualizar]";
        public static string ClientesBuscar = "[Venta].[sp_Clientes_Buscar]";
        public static string ClientesEliminar = "[Venta].[sp_Clientes_Eliminar]";

        #endregion




        #region VentasDetalle
        public static string VentasDetalle_Insertar = "[Venta].[SP_VentasDetalle_Insertar]";
        public static string VentasDetalle_Listar = "[Venta].[SP_VentasDetalle_List]";
        public static string VentasDetalle_Buscar = "[Venta].[SP_VentasDetalle_Buscar]";
        public static string VentasDetalle_Actualizar = "[Venta].[SP_VentasDetalle_Modificar]";
        public static string VentasDetalle_Delete = "[Venta].[SP_VentasDetalle_Eliminar]";
        #endregion

        #region VentasEncabezado
        public static string VentasEncabezado_Insertar = "[Venta].[SP_VentasEncabezado_Insertar]";
        public static string VentasEncabezado_Listar = "[Venta].[SP_VentasEncabezado_Lista]";
        public static string VentasEncabezado_Buscar = "[Venta].[SP_VentasEncabezado_Buscar]";
        public static string VentasEncabezado_Actualizar = "[Venta].[SP_VentasEncabezado_Modificar]";
        public static string VentasEncabezado_Delete = "[Venta].[SP_VentasEncabezado_Eliminar]";
        #endregion


        //-------------------------------------------------------------------------------------
        #region Graficos
        public static string Graph_CantidadVentaPorGenero = "Grph.SP_CantidadDeVentasPorGeneroAlMes";
        public static string Graph_TotalVentasPorCategoria = "Grph.SP_TotalDeVentasPorCategoriaPorMes";
        public static string Graph_CantidadRegistrosPorClientesPorGenero = "Grph.SP_CantidadDeRegistrosDeClientesPorGeneroPorMes";
        public static string Graph_TotalGanancia = "Grph.SP_TotalGananciaPorMes";
        public static string ProductoMasCompradoMes = "[Venta].[sp_Dash_ProductoMasCompradoMes]";
        #endregion







        #region Clientes
        public static string Clientes_MunicipioDDL = "[Gral].[SP_Municipios_DropDownList]";
        public static string Clientes_EstadoCivilDDL = "[Gral].[SP_EstadosCiviles_DropDownList]";
        #endregion



        #region Categorias
        public static string Categorias_Listar = "Gral.SP_Categorias_Lista";
        #endregion


        #region sucursales
        public static string Sucursales_Drop = "Supr.SP_Sucursales_DDL";
        #endregion


        //#region Pantallas 
        //public static string PantallaInsertar = "[Acce].[SP_Pantallas_Insertar]";
        //public static string PantallaListar = "";
        //public static string PantallaBuscar = "";
        //public static string PantallaActualizar = "";
        //public static string PantallaDeelete = "";
        //#endregion

        //#region PantallasPorroles
        //public static string PantallaporRolesInsertar = "";
        //public static string PantallaRolesListar = "";
        //public static string PantallaRolesActualizar = "";
        //public static string PantallaRolesBuscar = "";
        //public static string PantallaRolesDelete = "";
        //#endregion



        //#region Roles
        //public static string RolInsertar = "";
        //public static string RolListar = "";
        //public static string RolActualizar = "";
        //public static string RolBuscar = "";
        //public static string RolEliminar = "";
        //#endregion

    }

}