using Sistema_Larach.DataAccess.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.BusinessLogic.Services
{
    public class GraficoServices
    {
        private readonly GraficoRepository _graficoRepository;
        public GraficoServices(GraficoRepository graficoRepository)
        {
            _graficoRepository = graficoRepository;
        }

        public ServiceResult CantidadVentaPorGenero()
        {
            var result = new ServiceResult();
            try
            {
                var list = _graficoRepository.CantidadVentaPorGenero();
                if (list.Any())
                {
                    return result.Ok(list);
                }
                else {
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult TotalVentasPorCategoria()
        {
            var result = new ServiceResult();
            try
            {
                var list = _graficoRepository.TotalVentasPorCategoria();
                if (list.Any())
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
        //public ServiceResult CantidadRegistrosPorClientesPorGenero()
        //{
        //    var result = new ServiceResult();
        //    try
        //    {
        //        var list = _graficoRepository.CantidadRegistrosPorClientesPorGenero();
        //        if (list.Any())
        //        {
        //            return result.Ok(list);
        //        }
        //        else
        //        {
        //            return result.Error(list);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return result.Error(ex.Message);
        //    }
        //}
        public ServiceResult TotalGanancia()
        {
            var result = new ServiceResult();
            try
            {
                var list = _graficoRepository.TotalGanancia();
                if (list.Any())
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

        public ServiceResult totalProductoMes()
        {
            var result = new ServiceResult();
            try
            {
                var list = _graficoRepository.CantidadProductoVenta();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }




        public ServiceResult totalMaquillajeMes()
        {
            var result = new ServiceResult();
            try
            {
                var list = _graficoRepository.ProductoMasCompradoMes();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }





  





   

        public ServiceResult totalinJoyasMes()
        {
            var result = new ServiceResult();
            try
            {
                var list = _graficoRepository.TotalVentasPorCategoria();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }


        public ServiceResult totalGeneroMes()
        {
            var result = new ServiceResult();
            try
            {
                var list = _graficoRepository.CantidadRegistrosPorClientesPorGenero();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }





    



        public ServiceResult Ventatotalcate()
        {
            var result = new ServiceResult();
            try
            {
                var list = _graficoRepository.TotalDeVentasPorCategoriaPorMes();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }


        public ServiceResult Ventatotal()
        {
            var result = new ServiceResult();
            try
            {
                var list = _graficoRepository.VentastotalMesConDetallesProductos();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }


    }
}
