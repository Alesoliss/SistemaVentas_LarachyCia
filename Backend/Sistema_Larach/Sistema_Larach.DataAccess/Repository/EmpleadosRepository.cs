using AHM.Total.Travel.DataAccess.Repositories;
using Dapper;
using Microsoft.Data.SqlClient;
using Sistema_Larach.Common.Models;
using Sistema_Larach.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.DataAccess.Repository
{
    public class EmpleadosRepository : IRepository<tbEmpleados>
    {
        public IEnumerable<tbEmpleados> FindDetalle(int id)
        {
            string sql = $"[Cmrl].[sp_Empleados_buscar] '{id}'";

            List<tbEmpleados> result = new List<tbEmpleados>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbEmpleados>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }



        public RequestStatus Update(tbEmpleados item)
        {
            string sql = ScriptDataBase.EmpleadoActualizar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Emple_Id", item.Emple_Id);
                parametro.Add("@Emple_DNI", item.Emple_DNI);
                parametro.Add("@Emple_PrimerNombre", item.Emple_PrimerNombre);
                parametro.Add("@Emple_SegundoNombre", item.Emple_SegundoNombre);
                parametro.Add("@Emple_PrimerApellido", item.Emple_PrimerApellido);
                parametro.Add("@Emple_SegundoApellido", item.Emple_SegundoApellido);
                parametro.Add("@Emple_Sexo", item.Emple_Sexo);
                parametro.Add("@Estad_Id", item.Estad_Id);
                parametro.Add("@Emple_Telefono", item.Emple_Telefono);
                parametro.Add("@Emple_Correo", item.Emple_Correo);
                parametro.Add("@Emple_Direccion", item.Emple_Direccion);
                parametro.Add("@Munic_Id", item.Munic_Id);
                parametro.Add("@Cargo_Id", item.Cargo_Id);
                parametro.Add("@Emple_UsuarioModificacion", 1);
                parametro.Add("@Emple_FechaModificacion", DateTime.Now);
                parametro.Add("@Sucur_id", item.Sucur_Id);


                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };
            }
            //throw new NotImplementedException();
        }
        public IEnumerable<tbEmpleados> ObtenerEmpleados()
        {
            var sql = ScriptDataBase.EmpleadoBuscar;
            List<tbEmpleados> result = new List<tbEmpleados>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbEmpleados>(sql, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        public IEnumerable<tbEmpleados> FindClientes(int codigo)
        {
            string sql = $"[Cmrl].[sp_Empleados_buscar]'{codigo}'";
            List<tbEmpleados> result = new List<tbEmpleados>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbEmpleados>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }

        }
        public RequestStatus EliminarEmpleados(int id)
        {
            string sql = ScriptDataBase.EmpleadoEliminar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Emple_Id", id);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };

            }
        }

        public RequestStatus Insert(tbEmpleados item)
        {
            string sql = ScriptDataBase.EmpleadoInsertar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Emple_DNI", item.Emple_DNI);
                parameter.Add("@Emple_PrimerNombre", item.Emple_PrimerNombre);
                parameter.Add("@Emple_SegundoNombre", item.Emple_SegundoNombre);
                parameter.Add("@Emple_PrimerApellido", item.Emple_PrimerApellido);
                parameter.Add("@Emple_SegundoApellido", item.Emple_SegundoApellido);
                parameter.Add("@Emple_Sexo", item.Emple_Sexo);
                parameter.Add("@Estad_Id", item.Estad_Id);
                parameter.Add("@Emple_Telefono", item.Emple_Telefono);
                parameter.Add("@Emple_Correo", item.Emple_Correo);
                parameter.Add("@Emple_Direccion", item.Emple_Direccion);
                parameter.Add("@Munic_Id", item.Munic_Id);
                parameter.Add("@Cargo_Id", item.Cargo_Id);
                parameter.Add("@Emple_UsuarioCreacion", 1);
                parameter.Add("@Emple_fechaCreacion", DateTime.Now);
                parameter.Add("@Sucur_Id", item.Sucur_Id);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };
            }
        }


        public IEnumerable<ClienteViewModel> ListEstadosCiviles()
        {
            string sql = ScriptDataBase.Clientes_EstadoCivilDDL;

            List<tbClientes> result = new List<tbClientes>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbClientes>(sql, commandType: CommandType.Text).ToList();

                return result.Select(u => new ClienteViewModel
                {
                    Estad_Id = u.Estad_Id,
                    Estad_Descripcion = u.Estad_Descripcion
                });
            }
        }



        public IEnumerable<tbClientes> List()
        {
            string sql = ScriptDataBase.ClientesListar;
            List<tbClientes> result = new List<tbClientes>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbClientes>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }


        public IEnumerable<ClienteViewModel> ListMunicipios()
        {
            string sql = ScriptDataBase.Clientes_MunicipioDDL;

            List<tbClientes> result = new List<tbClientes>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbClientes>(sql, commandType: CommandType.Text).ToList();

                return result.Select(u => new ClienteViewModel
                {
                    Munic_Id = u.Munic_Id,
                    Munic_Descripcion = u.Munic_Descripcion
                });
            }
        }



        public IEnumerable<tbEmpleados> ListaEmpleado()
        {
            string sql = ScriptDataBase.EmpleadoListar;
            List<tbEmpleados> result = new List<tbEmpleados>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbEmpleados>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        IEnumerable<tbEmpleados> IRepository<tbEmpleados>.List()
        {
            throw new NotImplementedException();
        }

        public tbEmpleados Find(int? id)
        {
            throw new NotImplementedException();
        }
    }
}