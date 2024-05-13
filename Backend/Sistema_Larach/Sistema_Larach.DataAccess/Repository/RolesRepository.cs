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
    public class RolesRepository 
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbRoles Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbRoles item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbRoles> List()
        {
            const string sql = " [Acce].[sp_Roles_listar]";

            List<tbRoles> result = new List<tbRoles>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbRoles>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

     


        public int Insertar(tbRoles item)
        {
            const string sql = "[Acce].[sp_Roles2_insertar]";



            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Role_Rol", item.Roles_Descripcion);
                parametro.Add("@Role_UsuarioCreacion", 1);
                parametro.Add("@ID", DbType.Int32, direction: ParameterDirection.Output);


                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                int id = parametro.Get<int>("@ID");


                return id;
            }





        }

        public tbRoles Fill(int id)
        {

            tbRoles result = new tbRoles();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Role_Id", id);
                result = db.QueryFirst<tbRoles>(ScriptDataBase.Rolesllenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }

        }

        public RequestStatus Update(tbRoles item)
        {
            string sql = ScriptDataBase.RolesActualizar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Role_Id", item.Roles_Id);
                parameter.Add("@Role_Rol", item.Roles_Descripcion);
                parameter.Add("@Role_UsuarioModificacion", 1);
                parameter.Add("@Role_FechaModificacion", DateTime.Now);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }



        public RequestStatus Delete(string Roles_Id)
        {
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Roles_Id", Roles_Id);

                var result = db.QueryFirst(ScriptDataBase.RolesEliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }














    }
}
