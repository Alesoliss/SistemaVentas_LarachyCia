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
    public class ProveedoresRepository : IRepository<tbProveedores>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbProveedores Find(int? id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbProveedores> FindDetalle(int id)
        {
            string sql = $"[Cmrl].[sp_Proveedores_Buscar] '{id}'";

            List<tbProveedores> result = new List<tbProveedores>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbProveedores>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Insert(tbProveedores item)
        {
            string sql = ScriptDataBase.ProveedorInsertar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Prove_Marca", item.Prove_Marca);
                parametro.Add("@Prove_ContactoPrimerNombre", item.Prove_ContactoPrimerNombre);
                parametro.Add("@Prove_ContactoSegundoNombre", item.Prove_ContactoSegundoNombre);
                parametro.Add("@Prove_ContactoPrimerApellido", item.Prove_ContactoPrimerApellido);
                parametro.Add("@Prove_ContactoSegundoApellido", item.Prove_ContactoSegundoApellido);
                parametro.Add("@Munic_Id", item.Munic_Id);
                parametro.Add("@Prove_Direccion", item.Prove_Direccion);
                parametro.Add("@Prove_Telefono", item.Prove_Telefono);
                parametro.Add("@Prove_Correo", item.Prove_Correo);
                parametro.Add("@Prove_Notas", item.Prove_Notas);

                parametro.Add("@Prove_UsuarioCreacion", 1);
                parametro.Add("@Prove_FechaCreacion", DateTime.Now);
                parametro.Add("@Prove_Estado", 1);

                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };


            }
        }



        public RequestStatus Update(tbProveedores item)
        {
            string sql = ScriptDataBase.ProveedorActualizar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Prove_Marca", item.Prove_Marca);
                parametro.Add("@Prove_ContactoPrimerNombre", item.Prove_ContactoPrimerNombre);
                parametro.Add("@Prove_ContactoSegundoNombre", item.Prove_ContactoSegundoNombre);
                parametro.Add("@Prove_ContactoPrimerApellido", item.Prove_ContactoPrimerApellido);
                parametro.Add("@Prove_ContactoSegundoApellido", item.Prove_ContactoSegundoApellido);
                parametro.Add("@Munic_Id", item.Munic_Id);
                parametro.Add("@Prove_Direccion", item.Prove_Direccion);
                parametro.Add("@Prove_Telefono", item.Prove_Telefono);
                parametro.Add("@Prove_Correo", item.Prove_Correo);
                parametro.Add("@Prove_Notas", item.Prove_Notas);

                parametro.Add("@Prove_UsuarioModificacion", 1);
                parametro.Add("@Prove_FechaModificacion", DateTime.Now);
                parametro.Add("@Prove_Estado", 1);

                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };
            }
            //throw new NotImplementedException();
        }
        public IEnumerable<tbProveedores> ObtenerProveedoresd()
        {
            var sql = ScriptDataBase.ProveedorBuscar;
            List<tbProveedores> result = new List<tbProveedores>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbProveedores>(sql, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        public IEnumerable<tbProveedores> FindProveedores(int codigo)
        {
            string sql = $"[Cmrl].[sp_Proveedores_Buscar] '{codigo}'";
            List<tbProveedores> result = new List<tbProveedores>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbProveedores>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }

        }
        public RequestStatus EliminarProveedor(int id)
        {
            string sql = ScriptDataBase.ProveedorEliminar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Prove_Id", id);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };

            }
        }


        public IEnumerable<tbProveedores> List()
        {
            string sql = ScriptDataBase.ProveedorListar;
            List<tbProveedores> result = new List<tbProveedores>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbProveedores>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }
    }
}
