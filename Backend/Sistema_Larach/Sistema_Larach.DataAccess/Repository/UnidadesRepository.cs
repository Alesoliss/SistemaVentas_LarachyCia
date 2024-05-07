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
    public class UnidadesRepository : IRepository<tbUnidades>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbEstadosCiviles Find(int? id)
        {
            throw new NotImplementedException();
        }






        public IEnumerable<tbUnidades> List()
        {
            string sql = ScriptDataBase.UnidadesListar;
            List<tbUnidades> result = new List<tbUnidades>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbUnidades>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }





        public IEnumerable<tbUnidades> FindDetalle(int id)
        {
            string sql = $"[Gral].[sp_Unidades_Buscar]'{id}'";

            List<tbUnidades> result = new List<tbUnidades>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbUnidades>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Insert(tbUnidades item)
        {
            string sql = ScriptDataBase.UnidadesInsertar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Unida_Descripcion", item.Unida_Descripcion);

                parametro.Add("@Unida_UsuarioCreacion", 1);
                parametro.Add("@Unida_FechaCreacion", DateTime.Now);
                parametro.Add("@Unida_Estado", true);


                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };


            }
        }



        public RequestStatus Update(tbUnidades item)
        {
            string sql = ScriptDataBase.UnidadesActuzalizar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Unida_Id", item.Unida_Id);
                parametro.Add("@Unida_Descripcion", item.Unida_Descripcion);


                parametro.Add("@Unida_UsuarioModificacion", 1);
                parametro.Add("@Unida_FechaModificacion", DateTime.Now);
                parametro.Add("@Unida_Estado", true);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };
            }
            //throw new NotImplementedException();
        }
        public IEnumerable<tbUnidades> ObtenerUnidad()
        {
            var sql = ScriptDataBase.UnidadesBuscar;
            List<tbUnidades> result = new List<tbUnidades>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbUnidades>(sql, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        public IEnumerable<tbUnidades> FindUnidad(int codigo)
        {
            string sql = $"[Gral].[sp_Unidades_Buscar] '{codigo}'";
            List<tbUnidades> result = new List<tbUnidades>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbUnidades>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }

        }
        public RequestStatus EliminarUnidades(int id)
        {
            string sql = ScriptDataBase.UnidadesEliminar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Unida_Id", id);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };

            }
        }



        IEnumerable<tbUnidades> IRepository<tbUnidades>.List()
        {
            throw new NotImplementedException();
        }

        tbUnidades IRepository<tbUnidades>.Find(int? id)
        {
            throw new NotImplementedException();
        }
    }
}