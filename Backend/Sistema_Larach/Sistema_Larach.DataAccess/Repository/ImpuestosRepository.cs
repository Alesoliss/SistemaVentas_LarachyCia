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
    public class ImpuestosRepository : IRepository<tbImpuestos>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbImpuestos Find(int? id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbImpuestos> FindDetalle(int id)
        {
            string sql = $"[Gral].[sp_Impuestos_Buscar] '{id}'";

            List<tbImpuestos> result = new List<tbImpuestos>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbImpuestos>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Insert(tbImpuestos item)
        {
            string sql = ScriptDataBase.ImpuestoInsertar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Impue_Descripcion", item.Impue_Descripcion);
                parametro.Add("@Impue_UsuarioCreacion", 1);
                parametro.Add("@Impue_FechaCreacion", DateTime.Now);
                parametro.Add("@Impue_Estado", true);

                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };


            }
        }



        public RequestStatus Update(tbImpuestos item)
        {
            string sql = ScriptDataBase.ImpuestoActuzalizar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Impue_Id", item.Impue_Id);
                parametro.Add("@Impue_Descripcion", item.Impue_Descripcion);
                parametro.Add("@Impue_UsuarioModificacion", 1);
                parametro.Add("@Impue_FechaModificacion", DateTime.Now);
                parametro.Add("@Impue_Estado", true);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };
            }
            //throw new NotImplementedException();
        }
        public IEnumerable<tbImpuestos> ObtenerImpuesto()
        {
            var sql = ScriptDataBase.ImpuestoBuscar;
            List<tbImpuestos> result = new List<tbImpuestos>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbImpuestos>(sql, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        public IEnumerable<tbImpuestos> FindImpuesto(int codigo)
        {
            string sql = $"[Gral].[sp_Impuestos_Buscar] '{codigo}'";
            List<tbImpuestos> result = new List<tbImpuestos>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbImpuestos>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }

        }
        public RequestStatus EliminarImpuesto(int id)
        {
            string sql = ScriptDataBase.Impuestoeliminar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Impue_Id", id);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };

            }
        }


        public IEnumerable<tbImpuestos> List()
        {
            string sql = ScriptDataBase.ImpuestoListar;
            List<tbImpuestos> result = new List<tbImpuestos>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbImpuestos>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }
    }
}