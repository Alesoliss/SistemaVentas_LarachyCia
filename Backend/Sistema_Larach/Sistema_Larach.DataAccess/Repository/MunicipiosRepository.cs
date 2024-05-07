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
    public class MunicipiosRepository : IRepository<tbMunicipios>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbMunicipios Find(int? id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbMunicipios> FindDetalle(string id)
        {
            string sql = $"[Gral].[sp_Municipios_Buscar] '{id}'";

            List<tbMunicipios> result = new List<tbMunicipios>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbMunicipios>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }



        public RequestStatus Insert(tbMunicipios item)
        {
            string sql = ScriptDataBase.MunicipiosInsertar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Munic_Id", item.Munic_Id);
                parametro.Add("@Munic_Descripcion", item.Munic_Descripcion);
                parametro.Add("@Depar_Id", item.Depar_Id);
                parametro.Add("@Munic_UsuarioCreacion", 1);
                parametro.Add("@Munic_FechaCreacion", DateTime.Now);
                parametro.Add("@Munic_Estado", 1);

                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };


            }
        }



        public RequestStatus Update(tbMunicipios item)
        {
            string sql = ScriptDataBase.MunicipiosActualizar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Munic_Id", item.Munic_Id);
                parametro.Add("@Munic_Descripcion", item.Munic_Descripcion);
                parametro.Add("@Depar_Id", item.Depar_Id);
                parametro.Add("@Munic_UsuarioModificacion", 1);
                parametro.Add("@Munic_FechaModificacion", DateTime.Now);
                parametro.Add("@Munic_Estado", 1);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };
            }
            //throw new NotImplementedException();
        }
        public IEnumerable<tbMunicipios> ObtenerMunicipios()
        {
            var sql = ScriptDataBase.MunicipiosListar;
            List<tbMunicipios> result = new List<tbMunicipios>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbMunicipios>(sql, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        public IEnumerable<tbMunicipios> FindMunicipio(string codigo)
        {
            string sql = $"[Gral].[sp_Municipios_Buscar] '{codigo}'";
            List<tbMunicipios> result = new List<tbMunicipios>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbMunicipios>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }

        }
        public RequestStatus EliminarMunicipio(string id)
        {
            string sql = ScriptDataBase.MunicipiosEliminar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Munic_Id", id);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };

            }
        }





        public IEnumerable<tbMunicipios> List()
        {
            string sql = ScriptDataBase.MunicipiosListar;
            List<tbMunicipios> result = new List<tbMunicipios>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbMunicipios>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }
    }
}