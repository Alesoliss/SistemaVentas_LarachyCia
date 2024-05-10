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
            string sql = ScriptDataBase.ProductoMasCompradoMes;

            List<tbVentasDetalle> result = new List<tbVentasDetalle>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbVentasDetalle>(sql, commandType: System.Data.CommandType.Text).ToList();
                return result;
            }
        }
        /////////////////////Nuevos dash
        public IEnumerable<tbVentasEncabezado> VentasPorMes()
        {
            List<tbVentasEncabezado> result = new List<tbVentasEncabezado>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbVentasEncabezado>(ScriptDataBase.Grafica1_VentasPorMes, commandType: CommandType.Text).ToList();
                return result;
            }
        }
        public IEnumerable<tbVentasEncabezado> ProductosVendidosPorCategoriaMesAnio()
        {
            List<tbVentasEncabezado> result = new List<tbVentasEncabezado>();
            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {
                result = db.Query<tbVentasEncabezado>(ScriptDataBase.Grafica2_ProductosVendidosPorCategoriaMesAnio, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        ////////////////////////////////////////////////////////////////////////
        ///

        public IEnumerable<tbVentasDetalle> totalProductoMesfiltrado(DateTime fecha)
        {
            const string sql = "[Venta].[sp_Dash_Top5ProductosMasVendidos]";

            List<tbVentasDetalle> result = new List<tbVentasDetalle>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {


                int año = ObtenerAño(fecha);
                int mesi = Obtenemes(fecha);

                var parameter = new DynamicParameters();
                parameter.Add("@MesActual", mesi);
                parameter.Add("@AñoActual", año);


                result = db.Query<tbVentasDetalle>(sql, parameter, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }
        public IEnumerable<tbVentasDetalle> totalCategoriaMesfiltrado(DateTime fecha)
        {
            const string sql = "[Grph].[SP_TotalDeVentasPorCategoriaPorMes]";

            List<tbVentasDetalle> result = new List<tbVentasDetalle>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {


                int año = ObtenerAño(fecha);
                int mesi = Obtenemes(fecha);

                var parameter = new DynamicParameters();
                parameter.Add("@MesActual", mesi);
                parameter.Add("@AñoActual", año);



                result = db.Query<tbVentasDetalle>(sql, parameter, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }
        public IEnumerable<tbVentasDetalle> CantidadProductoVentaFiltrado(DateTime fecha)
        {
            const string sql = "[Venta].[Sp_Dash_CantidadProducto_Mes_Producto]";


            List<tbVentasDetalle> result = new List<tbVentasDetalle>();

            using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
            {


                int año = ObtenerAño(fecha);
                int mesi = Obtenemes(fecha);

                var parameter = new DynamicParameters();
                parameter.Add("@MesActual", mesi);
                parameter.Add("@AñoActual", año);



                result = db.Query<tbVentasDetalle>(sql, parameter, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }

        //public IEnumerable<tbVentasDetalle> VentastotalMesConDetallesProductosFiltrado(DateTime fecha)
        //{
        //    const string sql = "[Venta].[Sp_VentastotalMesConDetallesProductos]";


        //    List<tbVentasDetalle> result = new List<tbVentasDetalle>();

        //    using (var db = new SqlConnection(Sistema_LarachContext.ConnectionString))
        //    {


        //        int año = ObtenerAño(fecha);
        //        int mesi = Obtenemes(fecha);

        //        var parameter = new DynamicParameters();
        //        parameter.Add("@MesActual", mesi);
        //        parameter.Add("@AñoActual", año);



        //        result = db.Query<tbVentasDetalle>(sql, parameter, commandType: CommandType.StoredProcedure).ToList();

        //        return result;
        //    }
        //}


        public int ObtenerAño(DateTime fecha)
        {
            return fecha.Year;
        }



        public int Obtenemes(DateTime mes)
        {
            return mes.Month;
        }

    }
}