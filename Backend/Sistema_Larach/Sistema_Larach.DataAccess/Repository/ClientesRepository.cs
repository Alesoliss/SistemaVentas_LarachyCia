using AHM.Total.Travel.DataAccess.Repositories;
using Microsoft.Data.SqlClient;
using Dapper;
using Sistema_Larach.Common.Models;

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sistema_Larach.Entities;

namespace Sistema_Larach.DataAccess.Repository
{
    public class ClientesRepository
    {

        public IEnumerable<tbClientes> FindDetalle(string id)
        {
            string sql = $"[Venta].[sp_Clientes_Buscar] '{id}'";

            List<tbClientes> result = new List<tbClientes>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbClientes>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }



        public RequestStatus Update(tbClientes item)
        {
            string sql = ScriptDataBase.ClientesActualizar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Clien_Id", item.Clien_Id);
                parametro.Add("@Clien_PrimerNombre", item.Clien_PrimerNombre);
                parametro.Add("@Clien_SegundoNombre", item.Clien_SegundoNombre);
                parametro.Add("@Clien_PrimerApellido", item.Clien_PrimerApellido);
                parametro.Add("@Clien_SegundoApellido", item.Clien_SegundoApellido);
                parametro.Add("@Clien_Sexo", item.Clien_Sexo);
                parametro.Add("@Estad_Id", item.Estad_Id);
                parametro.Add("@Clien_Telefono", item.Clien_Telefono);
                parametro.Add("@Clien_Correo", item.Clien_Correo);
                parametro.Add("@Munic_Id", item.Munic_Id);
                parametro.Add("@Clien_Direccion", item.Clien_Direccion);
                parametro.Add("@Clien_UsuarioModificacion", item.Clien_UsuarioModificacion);
                parametro.Add("@Clien_FechaModificacion", item.Clien_FechaModificacion);
                parametro.Add("@Clien_Estado", 1);

                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };
            }
            //throw new NotImplementedException();
        }
        public IEnumerable<tbClientes> ObtenerClientes()
        {
            var sql = ScriptDataBase.ClientesBuscar;
            List<tbClientes> result = new List<tbClientes>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbClientes>(sql, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        public IEnumerable<tbClientes> FindClientes(int codigo)
        {
            string sql = $"[Venta].[sp_Clientes_Buscar] '{codigo}'";
            List<tbClientes> result = new List<tbClientes>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbClientes>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }

        }
        public RequestStatus EliminarClientes(int id)
        {
            string sql = ScriptDataBase.ClientesEliminar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Clien_Id", id);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };

            }
        }

        public RequestStatus Insert(tbClientes item)
        {
            string sql = "[Gral].[Cliente_Insertar]";

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@PrimerNombre", item.Clien_PrimerNombre);
                parameter.Add("@SegundoNombre", item.Clien_SegundoNombre);
                parameter.Add("@PrimerApellido", item.Clien_PrimerApellido);
                parameter.Add("@SegundoApellido", item.Clien_SegundoApellido);
                parameter.Add("@Sexo", item.Clien_Sexo);
                parameter.Add("@EstadId", item.Estad_Id);
                parameter.Add("@Telefono", item.Clien_Telefono);
                parameter.Add("@Correo", item.Clien_Correo);
                parameter.Add("@MunicId", item.Munic_Id);
                parameter.Add("@Direccion", item.Clien_Direccion);
                parameter.Add("@UsuarioCreacion", 1);
                parameter.Add("@FechaCreacion", DateTime.Now);
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



    }
}