
using Sistema_Larach.BusinessLogic;
using Sistema_Larach.Common.Models;
using Sistema_Larach.DataAccess.Repository;
using Sistema_Larach.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.BusinessLogic.Services
{
    public class SupermercadoService
    {
        private readonly ProductosRepository _productosRepository;
        private readonly VentasEncabezadoRepository _ventasEncabezado;
        private readonly VentasDetalleRepository _ventasDetalleRepository;
        private readonly EmpleadosRepository _empleadosRepository;
        private readonly ReportesRepository _reportesRepository;

        private readonly ClientesRepository _clientesRepository;




        public SupermercadoService(ProductosRepository productosRepository,
            EmpleadosRepository empleadosRepository,
            VentasEncabezadoRepository ventasEncabezado,
            ClientesRepository clientesRepository,
            ReportesRepository reportesRepository,


            VentasDetalleRepository ventasDetalleRepository
            )
        {
            _reportesRepository = reportesRepository;
            _productosRepository = productosRepository;
            _ventasEncabezado = ventasEncabezado;
            _ventasDetalleRepository = ventasDetalleRepository;
            _empleadosRepository = empleadosRepository;
            _clientesRepository = clientesRepository;


        }

        #region productos

        //public IEnumerable<ProductosViewModel> ListProductos(int categId)
        //{
        //    try
        //    {
        //        var productos = _productosRepository.List(categId);
        //        return productos;
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Error: {ex.Message}");
        //        throw;
        //    }
        //}

        public ServiceResult Lisrtadoencabezado()
        {
            var result = new ServiceResult();
            try
            {
                var list = _ventasEncabezado.ListaGeneral();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public IEnumerable<ProductosViewModel> ListProcuctosCarrito(int prodid, int vendetId)
        {
            try
            {
                var productos = _productosRepository.ListadoProductosCarrito(prodid, vendetId);
                return productos;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                throw;
            }
        }




        public ServiceResult ListadoProductos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _productosRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult InsertProductos(tbProductos item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _productosRepository.Insert(item);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }




        public ServiceResult UpdateProductos(tbProductos item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _productosRepository.Update(item);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult Delete(int Produ_Id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _productosRepository.Delete(Produ_Id);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult CargarProductos(int Produ_Id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _productosRepository.find(Produ_Id);

                return result.Ok(lost);

            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult DetallesProductos(int Produ_Id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _productosRepository.Details(Produ_Id);

                return result.Ok(lost);

            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public IEnumerable<tbImpuestos> ListImpuestos()
        {
            try
            {
                var usuarios = _productosRepository.ListImpuestos();
                return usuarios;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"errorrr: {ex.Message}");

                throw;
            }
        }


        public IEnumerable<CategoriasViewModel> ListCategorias()
        {
            try
            {
                var usuarios = _productosRepository.Listcategorias();
                return usuarios;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"errorrr: {ex.Message}");

                throw;
            }
        }


        //public IEnumerable<tbEstadosCiviles> ListUnidades()
        //{
        //    try
        //    {
        //        var usuarios = _productosRepository.ListUnidades();
        //        return usuarios;
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"errorrr: {ex.Message}");

        //        throw;
        //    }
        //}


        public IEnumerable<CategoriasViewModel> ListadoCategoriaPrincipal()
        {
            try
            {
                var categorias = _productosRepository.ListCategorias();
                return categorias;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                throw;
            }
        }




        public IEnumerable<ProductosViewModel> ListSucursales()
        {
            try
            {
                var usuarios = _productosRepository.ListSucursales();
                return usuarios;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"errorrr: {ex.Message}");

                throw;
            }
        }


        public IEnumerable<tbProveedores> ListProveedores()
        {
            try
            {
                var usuarios = _productosRepository.ListProveedor();
                return usuarios;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"errorrr: {ex.Message}");

                throw;
            }
        }




        #endregion










        #region Encabezado
        public IEnumerable<VentasEncabezadoViewModel> ListEncabezado()
        {
            try
            {
                var usuarios = _ventasEncabezado.List();
                return usuarios;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"errorrr: {ex.Message}");

                throw;
            }
        }


        public IEnumerable<VentasEncabezadoViewModel> ListSucursal()
        {
            try
            {
                var usuarios = _ventasEncabezado.ListSucursales();
                return usuarios;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"errorrr: {ex.Message}");

                throw;
            }
        }


        //public int InsertEncabezado(tbVentasEncabezado item)
        //{
        //    var repository = new VentasEncabezadoRepository(); 
        //    return repository.Insert(item);
        //}


        public tbVentasEncabezado InsertEncabezado(tbVentasEncabezado item)
        {
            try
            {
                var result = _ventasEncabezado.Insert(item);
                if (result.CodeStatus > 0)
                {
                    return item;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }






        public ServiceResult UpdateEncabezado(tbVentasEncabezado item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _ventasEncabezado.Update(item);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult DeleteEncabezado(int Venen_Id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _ventasEncabezado.Delete(Venen_Id);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }



        public ServiceResult ListadoCarritoPrincipal(int Clien_Id)
        {
            var result = new ServiceResult();
            try
            {
                var encabezado = _ventasEncabezado.ListarCarritoPrincipal(Clien_Id);
                return result.Ok(encabezado);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult CargarEncabezado(int Venen_Id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _ventasEncabezado.find(Venen_Id);

                return result.Ok(lost);

            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        #endregion





        #region detalle

        public ServiceResult CargarDetalle(int Venen_Id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _ventasDetalleRepository.find(Venen_Id);

                return result.Ok(lost);

            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertDetalle(tbVentasDetalle item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _ventasDetalleRepository.Insert(item);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult UpdateDetalle(tbVentasEncabezado item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _ventasDetalleRepository.Update(item);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }




        public ServiceResult DeleteDetalle(int Venen_Id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _ventasDetalleRepository.Delete(Venen_Id);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }

        }



        public tbVentasEncabezado ObtenerEncabezadoExistente(int Clien_Id)
        {
            try
            {
                var encabezadoExistente = _ventasEncabezado.ListarCarritoPrincipal(Clien_Id).FirstOrDefault();

                return encabezadoExistente;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener el encabezado existente", ex);
            }
        }


        public bool ActualizarEncabezado(int mtPag_Id, int venen_Id, string venen_NroTarjeta)
        {
            try
            {
                _ventasEncabezado.ActualizarEncabezado(mtPag_Id, venen_Id, venen_NroTarjeta);
                return true;
            }
            catch
            {
                return false;
            }
        }




        //public IEnumerable<tbMetodosPago> ListarMetodosPago()
        //{
        //    return _ventasEncabezado.ListarMetodosPago();
        //}


        #endregion





        #region empleado
        public ServiceResult ListadoEmpleados()
        {
            var result = new ServiceResult();
            try
            {
                var list = _empleadosRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion






        #region empleado
        public ServiceResult ListadoClientes()
        {
            var result = new ServiceResult();
            try
            {
                var list = _clientesRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion









        #region reportes
        public ServiceResult ReporteCrecimiento()
        {
            var result = new ServiceResult();
            try
            {
                var list = _reportesRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }




        public IEnumerable<tbReportes> ListadoReporte1()
        {
            try
            {
                return _reportesRepository.ListadoReporte1();
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
                return _reportesRepository.ListadoReporteCrecimientoVentas(Venen_FechaPedido1, Venen_FechaPedido2);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        #endregion



















        #region Factura


        public ServiceResult CrearFactura(tbVentasEncabezado item, out int id)
        {
            var result = new ServiceResult();
            try
            {
                var (lost, scope) = _ventasEncabezado.Insertar(item);
                id = scope;
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus != 1) ? "401 Error de consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                id = 0;
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarDetalle(tbVentasDetalle item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _ventasEncabezado.InsertarDetalle(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        #endregion


    }
}


