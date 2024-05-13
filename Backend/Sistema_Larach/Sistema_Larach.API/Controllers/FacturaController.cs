using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Sistema_Larach.BusinessLogic.Services;
using Sistema_Larach.Common.Models;
using Sistema_Larach.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sistema_Larach.API.Controllers
{
    [ApiController]
    [Route("/API/[controller]")]
    public class FacturaController : Controller
    {

        private readonly SupermercadoService _supermercadoService;


        private readonly IMapper _mapper;
        public FacturaController(SupermercadoService supermercadoService, IMapper mapper)
        {
            _supermercadoService = supermercadoService;

            _mapper = mapper;
        }



        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _supermercadoService.ListadoFactura();
            return Ok(list.Data);
        }

        [HttpGet("Fill/{id}")]
        public IActionResult LLenar(string id)
        {
            var list = _supermercadoService.Facturafill(id);
            return Ok(list.Data);
        }




        [HttpGet("ListaDetalles/{id}")]
        public IActionResult ListaDetalles(string id)
        {
            var list = _supermercadoService.ListadoFacturaDetalles(id);
            return Ok(list.Data);
        }

        [HttpPost("Create")]

        public IActionResult Insert(FaturaDViewModel item)
        {
           
                var modele = _mapper.Map<tbVentasEncabezado>(item);
            var modeloFactura = new tbVentasEncabezado()
            {
                Clien_Id = item.Clien_Id,
                MtPag_Id = item.MtPag_Id,
                Venen_Id = item.Venen_Id,

                };
            if (item.Venen_Id == 0)
            {
                var IdFactura = _supermercadoService.CrearFactura(modeloFactura, out int id);
                IdFactura.Message = id.ToString();

                var model = _mapper.Map<tbVentasDetalle>(item);
                var modelo = new tbVentasDetalle()
                {
                    Produ_Descripcion = item.Produ_Descripcion,
                    Vende_Cantidad = item.Vende_Cantidad,
                    Venen_Id = Convert.ToInt32(IdFactura.Message),
                };
                var list = _supermercadoService.InsertarDetalle(modelo);
                return Ok(new { success = true, message = list.Message, id = IdFactura.Message });
            }
            else
            {
                var IdFactura = _supermercadoService.CrearFactura(modeloFactura, out int id);
                IdFactura.Message = id.ToString();
                var model = _mapper.Map<tbVentasDetalle>(item);
                var modelo = new tbVentasDetalle()
                {
                    Produ_Descripcion = item.Produ_Descripcion,
                    Vende_Cantidad = item.Vende_Cantidad,
                    Venen_Id = item.Venen_Id,
                };
                var list = _supermercadoService.InsertarDetalle(modelo);
                return Ok(new { success = true, message = list.Message, id = item.Venen_Id });
            }
        }





        [HttpGet("FaturaEmitida/{id}")]
        public IActionResult EmisionFactura(string id)
        {
            var list = _supermercadoService.Emision(id);
            return Ok(new { success = true, message = list.Message });
        }



        [HttpDelete("DeleteDetalle/{id},{nombre}")]
        public IActionResult DeleteDetalle(string id, string nombre)
        {
            var list = _supermercadoService.ElimnarFacturaDetalle(id, nombre);
            return Ok(new { success = true, message = list.Message });
        }

    }
    }
