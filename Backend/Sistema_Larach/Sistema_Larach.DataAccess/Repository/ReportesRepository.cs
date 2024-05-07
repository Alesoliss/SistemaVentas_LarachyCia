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
    public class ReportesRepository
    {
        public IEnumerable<tbReportes> List()
        {
            string sql = "Venta.SP_Ventas_Reporte_Crecimiento";
            List<tbReportes> result = new List<tbReportes>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbReportes>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }




        public IEnumerable<tbReportes> ListadoReporte1()
        {
            try
            {
                string sql = "Venta.SP_Ventas_Reporte_Crecimiento";
                using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
                {
                    return db.Query<tbReportes>(sql, commandType: System.Data.CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception ex)
            {
              throw; 
            }
        }




        public IEnumerable<tbReportes> ListadoReporteCrecimientoVentas(DateTime Venen_FechaPedido1, 
            DateTime Venen_FechaPedido2)
        {
            try
            {
                string sql = "Venta.SP_Reporte_CrecimientoVentas";
                using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
                {
                    var parametro = new DynamicParameters();
                    parametro.Add("Venen_FechaPedido1", Venen_FechaPedido1);
                    parametro.Add("Venen_FechaPedido2", Venen_FechaPedido2);

                    return db.Query<tbReportes>(sql, parametro, commandType: System.Data.CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }



        public IEnumerable<tbReportes> ListadoVentasPorFecha()
        {
            try
            {
                string sql = "Venta.SP_Ventas_Reporte_Crecimiento";
                using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
                {
                    return db.Query<tbReportes>(sql, commandType: System.Data.CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }


    }
}