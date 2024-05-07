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
    public class CategoriasRepository : IRepository<tbCategorias>
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbCategorias Find(int? id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbCategorias> FindDetalle(string id)
        {
            string sql = $"[Gral].[sp_Categorias_Buscar] '{id}'";

            List<tbCategorias> result = new List<tbCategorias>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbCategorias>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Insert(tbCategorias item)
        {
            string sql = ScriptDataBase.categoriaInsertar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Categ_Descripcion", item.Categ_Descripcion);
                parametro.Add("@Categ_UsuarioCreacion", 1);
                parametro.Add("@Categ_FechaCreacion", DateTime.Now);
                parametro.Add("@Categ_Estado", true);
                parametro.Add("@Cate_ImagenUrl", item.Categ_FechaCreacion);

                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };


            }
        }



        public RequestStatus Update(tbCategorias item)
        {
            string sql = ScriptDataBase.categoriaActualizar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Categ_Id", item.Categ_Id);
                parametro.Add("@Categ_Descripcion", item.Categ_Descripcion);
                parametro.Add("@Categ_UsuarioModificacion", 1);
                parametro.Add("@Categ_FechaModificacion", DateTime.Now);
                parametro.Add("@Categ_Estado", true);
                parametro.Add("@Cate_ImagenUrl", item.Cate_ImagenUrl);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };
            }
            //throw new NotImplementedException();
        }
        public IEnumerable<tbCategorias> ObtenerCategoria()
        {
            var sql = ScriptDataBase.categoriabuscar;
            List<tbCategorias> result = new List<tbCategorias>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbCategorias>(sql, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        public IEnumerable<tbCategorias> FindCategoria(int codigo)
        {
            string sql = $"[Gral].[sp_Categorias_Buscar] '{codigo}'";
            List<tbCategorias> result = new List<tbCategorias>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbCategorias>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }

        }
        public RequestStatus Eliminarcategoria(int id)
        {
            string sql = ScriptDataBase.categoriaeliminar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Categ_Id", id);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };

            }
        }

        public IEnumerable<tbCategorias> List()
        {
            string sql = ScriptDataBase.categoriaListar;
            List<tbCategorias> result = new List<tbCategorias>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbCategorias>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }


        tbCategorias IRepository<tbCategorias>.Find(int? id)
        {
            throw new NotImplementedException();
        }
    }
}