using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Sistema_Larach.BusinessLogic;
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
    public class MetodosPagoController : Controller
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;

        public MetodosPagoController(GeneralServices generalService, IMapper mapper)
        {
            _generalServices = generalService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]

        public IActionResult Index()
        {

            var listado = _generalServices.Listadometodos();

            return Ok(listado);
        }
        [HttpPost("Create")]
        public IActionResult Insert(MetodosPagoViewModel item)
        {
            var model = _mapper.Map<tbMetodospago>(item);
            var modelo = new tbMetodospago()
            {
                MtPag_Descripcion = item.MtPag_Descripcion

            };
            var list = _generalServices.InsertarMetodo(modelo);
            if (list.Success)
            {
                return Ok(list);
            }
            else
            {
                return Problem(list.Message);
            }
        }

        [HttpPut("Actualizar")]
        public IActionResult Update(MetodosPagoViewModel item)
        {

            var model = _mapper.Map<tbMetodospago>(item);
            var modelo = new tbMetodospago()
            {
                MtPag_Id = item.MtPag_Id,
                MtPag_Descripcion = item.MtPag_Descripcion,
                //MtPag_UsuarioModificacion = 1,
                //MtPag_FechaModificacion = DateTime.Now,
                //MtPag_Estado = true

            };
            var list = _generalServices.ActualizarMetodo(modelo);
            if (list.Success)
            {
                return Ok(list);
            }
            else
            {
                return Problem(list.Message);
            }
        }
        [HttpGet("Detalles")]
        public IActionResult Details(int MtPag_Id)
        {
            var list = _generalServices.BuscarMEtodo(MtPag_Id);

            return Ok(list);
        }

        [HttpDelete("Eliminar/{MtPag_Id}")]
        public IActionResult Delete(int MtPag_Id)
        {
            var result = new ServiceResult();

            var list = _generalServices.EliminarMetodo(MtPag_Id);
            if (list.Success)
            {
                return Ok(list);
            }
            else
            {
                return Problem(list.Message);
            }

        }
    }
}