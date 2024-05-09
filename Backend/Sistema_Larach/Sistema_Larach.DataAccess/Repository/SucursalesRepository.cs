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
    public class SucursalesRepository : IRepository<tbSucursales>
    {

        public IEnumerable<tbSucursales> List()
        {
            string sql = ScriptDataBase.sucursalListar;
            List<tbSucursales> result = new List<tbSucursales>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbSucursales>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbImpuestos Find(int? id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbSucursales> FindDetalle(int id)
        {
            string sql = $"[Cmrl].[sp_Sucursales_Buscar]'{id}'";

            List<tbSucursales> result = new List<tbSucursales>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbSucursales>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Insert(tbSucursales item)
        {
            string sql = ScriptDataBase.sucursalInsertar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Sucur_Descripcion", item.Sucur_Descripcion);
                parametro.Add("@Munic_Id", item.Munic_Id);
                parametro.Add("@Sucur_Direccion", item.Sucur_Direccion);
                parametro.Add("@Sucur_Telefono", item.Sucur_Telefono);
                parametro.Add("@Sucur_UsuarioCreacion", 1);
                parametro.Add("@Sucur_FechaCreacion", DateTime.Now);

                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };


            }
        }



        public RequestStatus Update(tbSucursales item)
        {
            string sql = ScriptDataBase.sucursalActualizar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Sucur_Id", item.Sucur_Id);
                parametro.Add("@Sucur_Descripcion", item.Sucur_Descripcion);
                parametro.Add("@Munic_Id", item.Munic_Id);
                parametro.Add("@Sucur_Direccion", item.Sucur_Direccion);
                parametro.Add("@Sucur_Telefono", item.Sucur_Telefono);
                parametro.Add("@Sucur_UsuarioModificacion", 1);
                parametro.Add("@Sucur_FechaModificacion", DateTime.Now);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };
            }
            //throw new NotImplementedException();
        }
        public IEnumerable<tbSucursales> ObtenerSucursal()
        {
            var sql = ScriptDataBase.sucursalBuscar;
            List<tbSucursales> result = new List<tbSucursales>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbSucursales>(sql, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        public IEnumerable<tbSucursales> FindSucursal(int codigo)
        {
            string sql = $"[Cmrl].[sp_Sucursales_Buscar] '{codigo}'";
            List<tbSucursales> result = new List<tbSucursales>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbSucursales>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }

        }
        public RequestStatus EliminarSucursal(int id)
        {
            string sql = ScriptDataBase.sucursalEliminar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Sucur_Id", id);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };

            }
        }

        tbSucursales IRepository<tbSucursales>.Find(int? id)
        {
            throw new NotImplementedException();
        }
    }
}