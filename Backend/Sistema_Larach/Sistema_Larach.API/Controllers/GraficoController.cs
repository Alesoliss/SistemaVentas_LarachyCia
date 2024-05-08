using AutoMapper;
using Sistema_Larach.BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sistema_Larach.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GraficoController : Controller
    {
        private readonly GraficoServices _graficoServices;

        private readonly IMapper _mapper;

        public GraficoController(GraficoServices graficoServices, IMapper mapper)
        {
            _graficoServices = graficoServices;
            _mapper = mapper;
        }

        [HttpGet("Grafico1")]
        public IActionResult Grafico1()
        {
            var listado = _graficoServices.CantidadVentaPorGenero();

            return Ok(listado);
        }
        [HttpGet("Grafico2")]
        public IActionResult Grafico2()
        {
            var listado = _graficoServices.TotalVentasPorCategoria();

            return Ok(listado);
        }
        //[HttpGet("Grafico3")]
        //public IActionResult Grafico3()
        //{
        //    var listado = _graficoServices.CantidadRegistrosPorClientesPorGenero();

        //    return Ok(listado);
        //}
        [HttpGet("Grafico4")]
        public IActionResult Grafico4()
        {
            var listado = _graficoServices.TotalGanancia();

            return Ok(listado);
        }


        [HttpGet("ProductoMes")]
        public IActionResult TotalProductosMes()
        {
            var list = _graficoServices.totalProductoMes();

            return Ok(list.Data);
        }


        [HttpGet("ProductoMasCompradoMes")]
        public IActionResult TotalMaqillajeMes()
        {
            var list = _graficoServices.totalMaquillajeMes();
            return Ok(list.Data);
        }


      






        [HttpGet("TotalVentasPorCategoria")]
        public IActionResult TotalVentasPorCategoria()
        {
            var list = _graficoServices.totalinJoyasMes();
            return Ok(list.Data);
        }




        //public IActionResult TotalJoyaMes()
        //{
        //    int ? total = 0;
        //    var list = _generalServices.totalJoyasMes();
        //    var lista = list.Data as List<tbFacturaDetalles>;
        //    foreach (var item in lista)
        //    {
        //        total += item.Total;
        //    }

        //    return Ok(lista.ToList());
        //}


        [HttpGet("GeneroMes")]
        public IActionResult TotalGeneroMes()
        {
            var list = _graficoServices.totalGeneroMes();
            return Ok(list.Data);
        }


     






        [HttpGet("Ventatotalescatgoria")]
        public IActionResult Ventatotalcate()
        {
            var list = _graficoServices.Ventatotalcate();
            return Ok(list.Data);
        }
    }
}
