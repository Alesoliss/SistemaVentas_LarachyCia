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
    public class CargosRepository : IRepository<tbCargos>
    {

        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbCargos Fill(int id)
        {
            tbCargos result = new tbCargos();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Cargo_Id", id);
                result = db.QueryFirst<tbCargos>(ScriptDataBase.cargoBuscar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public IEnumerable<tbCargos> FindDetalle(string id)
        {
            string sql = $"[Gral].[sp_Cargos_Buscar] '{id}'";

            List<tbCargos> result = new List<tbCargos>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbCargos>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Insert(tbCargos item)
        {
            string sql = ScriptDataBase.cargoInsertar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Cargo_Descripcion", item.Cargo_Descripcion);
                parametro.Add("@Cargo_UsuarioCreacion", 1);
                parametro.Add("@Cargo_FechaCreacion", DateTime.Now);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };


            }
        }



        public RequestStatus Update(tbCargos item)
        {
            string sql = ScriptDataBase.cargosActualizar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Cargo_Id", item.Cargo_Id);
                parametro.Add("@Cargo_Descripcion", item.Cargo_Descripcion);
                parametro.Add("@Cargo_UsuarioModificacion", 1);
                parametro.Add("@Cargo_FechaModificacion", DateTime.Now);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };
            }
            //throw new NotImplementedException();
        }
        public IEnumerable<tbCargos> ObtenerDeptos()
        {
            var sql = ScriptDataBase.cargoBuscar;
            List<tbCargos> result = new List<tbCargos>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbCargos>(sql, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        public IEnumerable<tbCargos> Findcargo(int codigo)
        {
            string sql = $"[Gral].[sp_Cargos_Buscar] '{codigo}'";
            List<tbCargos> result = new List<tbCargos>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbCargos>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }

        }
        public RequestStatus Eliminarcargo(int id)
        {
            string sql = ScriptDataBase.cargoEliminar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Cargo_Id", id);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };

            }
        }


        public IEnumerable<tbCargos> List()
        {
            string sql = ScriptDataBase.cargoListar;
            List<tbCargos> result = new List<tbCargos>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbCargos>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }

        public tbCargos Find(int? id)
        {
            throw new NotImplementedException();
        }
    }
}