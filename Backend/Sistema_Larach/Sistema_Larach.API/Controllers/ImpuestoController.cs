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
    public class ImpuestoController : Controller
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;

        public ImpuestoController(GeneralServices generalService, IMapper mapper)
        {
            _generalServices = generalService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]

        public IActionResult Index()
        {

            var listado = _generalServices.Listadoimpuestos();

            return Ok(listado);
        }

        [HttpPost("Create")]
        public IActionResult Insert(ImpuestosViewModel item)
        {
            var model = _mapper.Map<tbImpuestos>(item);
            var modelo = new tbImpuestos()
            {
                Impue_Descripcion = item.Impue_Descripcion,
                Impue_UsuarioCreacion = 1,
                Impue_FechaCreacion = DateTime.Now,
                Impue_Estado = true

            };
            var list = _generalServices.InsertarImpuesto(modelo);
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
        public IActionResult Update(ImpuestosViewModel item)
        {

            var model = _mapper.Map<tbImpuestos>(item);
            var modelo = new tbImpuestos()
            {
                Impue_Id = item.Impue_Id,
                Impue_Descripcion = item.Impue_Descripcion,
                Impue_UsuarioModificacion = 1,
                Impue_FechaModificacion = DateTime.Now,
                Impue_Estado = true

            };
            var list = _generalServices.ActualizarImpuesto(modelo);
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
        public IActionResult Details(int Impue_Id)
        {
            var list = _generalServices.BuscarImpuesto(Impue_Id);

            return Ok(list);
        }

        [HttpDelete("Eliminar/{Impue_Id}")]
        public IActionResult Delete(int Impue_Id)
        {
            var result = new ServiceResult();

            var list = _generalServices.EliminarImpuesto(Impue_Id);
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