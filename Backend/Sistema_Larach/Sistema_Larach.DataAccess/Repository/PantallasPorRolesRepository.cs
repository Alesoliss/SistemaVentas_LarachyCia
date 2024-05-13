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
    public class PantallasPorRolesRepository 
    {
        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbPantallasPorRoles Find(int? id)
        {
            throw new NotImplementedException();
        }

   

        public IEnumerable<tbPantallasPorRoles> List()
        {
            throw new NotImplementedException();
        }

    




        public RequestStatus Insert(tbPantallasPorRoles item)
        {
            const string sql = "[Acce].[sp_PantallasPorRoles_insertar]";



            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@roles_id", item.Roles_Id);
                parametro.Add("@panta_id ", item.Panta_Id);
                parametro.Add("@Papro_UsuarioCreacion ", 1);
                parametro.Add("@Papro_FechaCreacion", DateTime.Now);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbPantallasPorRoles> Lista()
        {
            const string sql = "Acce.sp_PantallasRoles_listar";

            List<tbPantallasPorRoles> result = new List<tbPantallasPorRoles>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbPantallasPorRoles>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }







        public IEnumerable<tbPantallasPorRoles> Fill(int id)
        {
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Role_Id", id);
                return db.Query<tbPantallasPorRoles>(ScriptDataBase.PantallasRolesllenar, parameter, commandType: CommandType.StoredProcedure);
            }
        }

        public IEnumerable<tbRoles> Fill2(int id)
        {
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Role_Id", id);
                return db.Query<tbRoles>(ScriptDataBase.Rolesllenar2, parameter, commandType: CommandType.StoredProcedure);
            }
        }


        public RequestStatus Update(tbPantallasPorRoles item)
        {
            string sql = ScriptDataBase.PantallasRolesActualizar;

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Papro_Id", item.Papro_Id);
                parameter.Add("@Roles_Id", item.Roles_Id);
                parameter.Add("@Panta_Id", item.Panta_Id);

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

                var result = db.QueryFirst(ScriptDataBase.PantallasRolesEliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }










    }
}
