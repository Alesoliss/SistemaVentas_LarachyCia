using AHM.Total.Travel.DataAccess.Repositories;
using Dapper;
using Microsoft.Data.SqlClient;
using Sistema_Larach.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.DataAccess.Repository
{
    public class DepartamentosRepository : IRepository<tbDepartamentos>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbDepartamentos Find(int? id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbDepartamentos> FindDetalle(string id)
        {
            string sql = $"[Gnrl].[SP_Departamentos_Detalle] '{id}'";

            List<tbDepartamentos> result = new List<tbDepartamentos>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbDepartamentos>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Insert(tbDepartamentos item)
        {
            string sql = ScriptDataBase.deptoInsertar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Depar_Id", item.Depar_Id);
                parametro.Add("@Depar_Descripcion", item.Depar_Descripcion);
                parametro.Add("@Depar_UsuarioCreacion", 1);
                parametro.Add("@Depar_FechaCreacion", DateTime.Now);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };


            }
        }

        public IEnumerable<tbDepartamentos> List()
        {
            string sql = ScriptDataBase.deptoListar;
            List<tbDepartamentos> result = new List<tbDepartamentos>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbDepartamentos>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Update(tbDepartamentos item)
        {
            string sql = ScriptDataBase.deptoActualizar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Depar_Id", item.Depar_Id);
                parametro.Add("@Depar_Descripcion", item.Depar_Descripcion);
                //parametro.Add("@Depar_UsuarioModificacion", 1);
                //parametro.Add("@Depa_FechaModificacion", DateTime.Now);
                //parametro.Add("@Depar_Estado", true);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };
            }
            //throw new NotImplementedException();
        }
        public IEnumerable<tbDepartamentos> ObtenerDeptos()
        {
            var sql = ScriptDataBase.deptoListar;
            List<tbDepartamentos> result = new List<tbDepartamentos>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbDepartamentos>(sql, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        public IEnumerable<tbDepartamentos> FindDepto(string codigo)
        {
            string sql = $"[Gral].[sp_Departamentos_Buscar] '{codigo}'";
            List<tbDepartamentos> result = new List<tbDepartamentos>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbDepartamentos>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }

        }
        public RequestStatus EliminarDepartamento(string id)
        {
            string sql = ScriptDataBase.deptoeliminar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Depar_Id", id);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };

            }
        }
    }
}