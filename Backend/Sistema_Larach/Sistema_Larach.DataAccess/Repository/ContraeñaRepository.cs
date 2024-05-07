using AHM.Total.Travel.DataAccess.Repositories;
using Microsoft.Data.SqlClient;
using Dapper;
using Sistema_Larach.Common.Models;

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sistema_Larach.Entities;
using Sistema_Larach.DataAccess.Repository;
using Sistema_Larach.DataAccess;

namespace Sistema_Larach.DataAccess.Repository
{
    public class ContraeñaRepository : IRepository<tbUsuarios>
    {





        public RequestStatus ActualizarContra(tbUsuarios item)
        {
            string sql = "[Acce].[SP_Usuarios_ReestablecerContrasenia]";

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Usuar_Id", item.Usuar_Id);
                parameter.Add("@Usuar_Contrasena", item.Usuar_Contrasena);
                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);

                return new RequestStatus { CodeStatus = result, MessageStatus = "" };
            }
        }






        public RequestStatus Delete(int? id)
        {
            throw new NotImplementedException();
        }

        public tbUsuarios Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbUsuarios item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbUsuarios> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbUsuarios item)
        {
            throw new NotImplementedException();
        }
    }
}