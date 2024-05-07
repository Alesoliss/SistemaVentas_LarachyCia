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
    public class MetodosPagoRepository : IRepository<tbMetodospago>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbImpuestos Find(int? id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbMetodospago> FindDetalle(int id)
        {
            string sql = $"[Gral].[sp_MetodosPago_Buscar] '{id}'";

            List<tbMetodospago> result = new List<tbMetodospago>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbMetodospago>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Insert(tbMetodospago item)
        {
            string sql = ScriptDataBase.MetodoInsrtar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@MtPag_Descripcion", item.MtPag_Descripcion);
                //parametro.Add("@MtPag_UsuarioCreacion", 1);
                //parametro.Add("@MtPag_FechaCreacion", DateTime.Now);
                //parametro.Add("@MtPag_Estado", true);

                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };


            }
        }



        public RequestStatus Update(tbMetodospago item)
        {
            string sql = ScriptDataBase.MetodoActuzalizar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@MtPag_Id", item.MtPag_Id);
                parametro.Add("@MtPag_Descripcion", item.MtPag_Descripcion);
                //parametro.Add("@MtPag_UsuarioModificacion", 1);
                //parametro.Add("@MtPag_FechaModificacion", DateTime.Now);
                //parametro.Add("@MtPag_Estado", true);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };
            }
            //throw new NotImplementedException();
        }
        public IEnumerable<tbMetodospago> ObtenerMetodoPago()
        {
            var sql = ScriptDataBase.MetodoBuscar;
            List<tbMetodospago> result = new List<tbMetodospago>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbMetodospago>(sql, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        public IEnumerable<tbMetodospago> FindMetodoPago(int codigo)
        {
            string sql = $"[Gral].[sp_MetodosPago_Buscar] '{codigo}'";
            List<tbMetodospago> result = new List<tbMetodospago>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbMetodospago>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }

        }
        public RequestStatus EliminarMetodoPago(int id)
        {
            string sql = ScriptDataBase.MetodoEliminar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("MtPag_Id", id);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };

            }
        }

        public IEnumerable<tbMetodospago> List()
        {
            string sql = ScriptDataBase.MetodoListar;
            List<tbMetodospago> result = new List<tbMetodospago>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbMetodospago>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }

        tbMetodospago IRepository<tbMetodospago>.Find(int? id)
        {
            throw new NotImplementedException();
        }
    }
}