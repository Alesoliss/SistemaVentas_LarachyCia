using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sistema_Larach.Common.Models;
using Sistema_Larach.Entities;

namespace Sistema_Larach.API.Extensiones
{
    public class MappingProfileExtensions : Profile
    {
        public MappingProfileExtensions()
        {
            CreateMap<CargosViewModel, tbCargos>().ReverseMap();
            CreateMap<CategoriasViewModel, tbCategorias>().ReverseMap();
            CreateMap<ClienteViewModel, tbClientes>().ReverseMap();
            CreateMap<ComprasDetalleViewModel, tbComprasDetalle>().ReverseMap();
            CreateMap<ComprasEncabezadoViewModel, tbComprasEncabezado>().ReverseMap();
            CreateMap<DepartamentosViewModel, tbDepartamentos>().ReverseMap();
            CreateMap<EmpleadosViewModel, tbEmpleados>().ReverseMap();
            CreateMap<EstadosCivilesViewModel, tbEstadosCiviles>().ReverseMap();
            CreateMap<GraficosViewModel, tbGraficos>().ReverseMap();
            CreateMap<ImpuestosViewModel, tbImpuestos>().ReverseMap();
            CreateMap<MetodosPagoViewModel, tbMetodospago>().ReverseMap();
            CreateMap<MuncipiosViewModel, tbMunicipios>().ReverseMap();
            CreateMap<PantallasPorRolesViewModel, tbPantallasPorRoles>().ReverseMap();
            CreateMap<PantallaViewModel, tbPantallas>().ReverseMap();
            CreateMap<ProductosViewModel, tbProductos>().ReverseMap();
            CreateMap<ProveedoresViewModel, tbProveedores>().ReverseMap();
            CreateMap<RolesViewModel, tbRoles>().ReverseMap();
            CreateMap<SucursalesViewModel, tbSucursales>().ReverseMap();
            CreateMap<UnidadesViewmodel, tbUnidades>().ReverseMap();
            CreateMap<UsuariosViewModel, tbUsuarios>().ReverseMap();
            CreateMap<VentasDetalleViewModel, tbVentasDetalle>().ReverseMap();
            CreateMap<tbVentasEncabezado, tbVentasEncabezado>().ReverseMap();

        }
    }
}