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
        public IEnumerable<tbVentasDetalle> TotalVentasPorCategoria()
        {
            const string sql = "Grph.SP_TotalDeVentasPorCategoriaPorMes";

            List<tbVentasDetalle> result = new List<tbVentasDetalle>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@MesActual", DateTime.Now.Month);
                parameter.Add("@AñoActual", DateTime.Now.Year);



                result = db.Query<tbVentasDetalle>(sql, parameter, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }
        public IEnumerable<tbVentasDetalle> TotalDeVentasPorCategoriaPorMes()
        {
            const string sql = "[Gral].[SP_TotalDeVentasPorCategoriaPorMes]";

            List<tbVentasDetalle> result = new List<tbVentasDetalle>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {


                result = db.Query<tbVentasDetalle>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }
        public IEnumerable<tbVentasDetalle> CantidadRegistrosPorClientesPorGenero()
        {
            const string sql = "Grph.SP_CantidadDeRegistrosDeClientesPorGeneroPorMes";

            List<tbVentasDetalle> result = new List<tbVentasDetalle>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {


                result = db.Query<tbVentasDetalle>(sql, commandType: CommandType.Text).ToList();

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

        public IEnumerable<tbVentasDetalle> VentastotalMesConDetallesProductos()
        {
            const string sql = "[Venta].[Sp_VentastotalMesConDetallesProductos]";

            List<tbVentasDetalle> result = new List<tbVentasDetalle>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {


                result = db.Query<tbVentasDetalle>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public IEnumerable<tbVentasDetalle> CantidadProductoVenta()
        {
            const string sql = "[Venta].[Sp_Dash_CantidadProducto_Mes_Producto]";

            List<tbVentasDetalle> result = new List<tbVentasDetalle>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@MesActual", DateTime.Now.Month);
                parameter.Add("@AñoActual", DateTime.Now.Year);



                result = db.Query<tbVentasDetalle>(sql, parameter, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }

        public IEnumerable<tbVentasDetalle> ProductoMasCompradoMes()
        {
            const string sql = "[Venta].[Sp_Dash_ProductoMasCompradoMes]";

            List<tbVentasDetalle> result = new List<tbVentasDetalle>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {


                var parameter = new DynamicParameters();
                parameter.Add("@MesActual", DateTime.Now.Month);
                parameter.Add("@AñoActual", DateTime.Now.Year);


                result = db.Query<tbVentasDetalle>(sql, parameter, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }
    }
}