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
    public class GraficoRepository
    {
        public IEnumerable<tbGraficos> CantidadVentaPorGenero()
        {
            string sql = ScriptDataBase.Graph_CantidadVentaPorGenero;

            List<tbGraficos> result = new List<tbGraficos>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbGraficos>(sql, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }
        public IEnumerable<tbGraficos> TotalVentasPorCategoria()
        {
            string sql = ScriptDataBase.Graph_TotalVentasPorCategoria;

            List<tbGraficos> result = new List<tbGraficos>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbGraficos>(sql, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }
        public IEnumerable<tbGraficos> CantidadRegistrosPorClientesPorGenero()
        {
            string sql = ScriptDataBase.Graph_CantidadRegistrosPorClientesPorGenero;

            List<tbGraficos> result = new List<tbGraficos>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbGraficos>(sql, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }

        public IEnumerable<tbGraficos> TotalGanancia()
        {
            string sql = ScriptDataBase.Graph_TotalGanancia;

            List<tbGraficos> result = new List<tbGraficos>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbGraficos>(sql, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }
    }
}