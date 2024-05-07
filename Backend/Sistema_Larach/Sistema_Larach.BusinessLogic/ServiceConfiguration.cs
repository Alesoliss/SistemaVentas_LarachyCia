using Sistema_Larach.DataAccess.Repository;
using Microsoft.Extensions.DependencyInjection;
using Sistema_Larach.BusinessLogic.Services;
using Sistema_Larach.DataAccess;
using System;
using System.Collections.Generic;
using System.Text;


namespace Sistema_Larach.BusinessLogic.Services
{
    public static class ServiceConfiguration
    {
        public static void DataAccess(this IServiceCollection service, string conn)
        {
            service.AddScoped<CargosRepository>();
            service.AddScoped<CategoriasRepository>();
            service.AddScoped<ClientesRepository>();
            service.AddScoped<ComprasDetalleRepository>();
            service.AddScoped<ComprasEncabezadoRepository>();
            service.AddScoped<DepartamentosRepository>();
            service.AddScoped<EmpleadosRepository>();
            service.AddScoped<EstadosCivilesRepository>();
            service.AddScoped<GraficoRepository>();
            service.AddScoped<ImpuestosRepository>();
            service.AddScoped<ReportesRepository>();


            service.AddScoped<MetodosPagoRepository>();
            service.AddScoped<MunicipiosRepository>();
            service.AddScoped<PantallasPorRolesRepository>();
            service.AddScoped<PantallasRepository>();
            service.AddScoped<ProductosRepository>();
            service.AddScoped<ProveedoresRepository>();
            service.AddScoped<RolesRepository>();
            service.AddScoped<SucursalesRepository>();
            service.AddScoped<UnidadesRepository>();
            service.AddScoped<UsuariosRepository>();
            service.AddScoped<VentasDetalleRepository>();
            service.AddScoped<VentasEncabezadoRepository>();




            Sistema_LarachContext.BuildConnectionString(conn);
        }
        public static void BusinessLogic(this IServiceCollection service)
        {
            service.AddScoped<GeneralServices>();
            service.AddScoped<AccesoService>();
            service.AddScoped<GraficoServices>();
            service.AddScoped<CompraService>();
            service.AddScoped<SupermercadoService>();
        }
    }
}
