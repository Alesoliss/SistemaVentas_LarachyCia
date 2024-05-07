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
    public class EstadosCivilesRepository : IRepository<tbEstadosCiviles>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbEstadosCiviles Find(int? id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbEstadosCiviles> FindDetalle(int id)
        {
            string sql = $"[Gral].[sp_EstadosCiviles_Buscar] '{id}'";

            List<tbEstadosCiviles> result = new List<tbEstadosCiviles>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbEstadosCiviles>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Insert(tbEstadosCiviles item)
        {
            string sql = ScriptDataBase.estadoInsertar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Estad_Descripcion", item.Estad_Descripcion);
                parametro.Add("@Estad_UsuarioCreacion", 1);
                parametro.Add("@Estad_FechaCreacion", DateTime.Now);
                parametro.Add("@Estad_Estado", 1);

                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };


            }
        }

        public IEnumerable<tbEstadosCiviles> List()
        {
            string sql = ScriptDataBase.estadoListar;
            List<tbEstadosCiviles> result = new List<tbEstadosCiviles>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbEstadosCiviles>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Update(tbEstadosCiviles item)
        {
            string sql = ScriptDataBase.estadoActuzalizar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Estad_Id", item.Estad_Id);
                parametro.Add("@Estad_Descripcion", item.Estad_Descripcion);
                parametro.Add("@Estad_UsuarioModificacion", 1);
                parametro.Add("@Estad_FechaModificacion", DateTime.Now);
                parametro.Add("@Estad_Estado", 1);

                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };
            }
            //throw new NotImplementedException();
        }
        public IEnumerable<tbEstadosCiviles> DDLEstadoCivil()
        {
            var sql = ScriptDataBase.estadoListar;
            List<tbEstadosCiviles> result = new List<tbEstadosCiviles>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbEstadosCiviles>(sql, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        public IEnumerable<tbEstadosCiviles> FindEstado(int codigo)
        {
            string sql = $"[Gral].[sp_EstadosCiviles_Buscar] '{codigo}'";
            List<tbEstadosCiviles> result = new List<tbEstadosCiviles>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbEstadosCiviles>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }

        }
        public RequestStatus EliminarEstadoCivil(int id)
        {
            string sql = ScriptDataBase.estadoeliminar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Estad_Id", id);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };

            }
        }
    }
}