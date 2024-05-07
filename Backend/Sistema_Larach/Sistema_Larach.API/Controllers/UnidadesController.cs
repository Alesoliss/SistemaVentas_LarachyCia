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
    public class UnidadesController : Controller
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;

        public UnidadesController(GeneralServices generalService, IMapper mapper)
        {
            _generalServices = generalService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]

        public IActionResult Index()
        {

            var listado = _generalServices.ListadoUnidades();

            return Ok(listado);
        }
        [HttpPost("Create")]
        public IActionResult Insert(UnidadesViewmodel item)
        {
            var model = _mapper.Map<tbUnidades>(item);
            var modelo = new tbUnidades()
            {
                Unida_Descripcion = item.Unida_Descripcion,
                Unida_UsuarioCreacion = 1,
                Unida_FechaCreacion = DateTime.Now,
                Unida_Estado = true

            };
            var list = _generalServices.InsertarUnidades(modelo);
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
        public IActionResult Update(UnidadesViewmodel item)
        {

            var model = _mapper.Map<tbUnidades>(item);
            var modelo = new tbUnidades()
            {
                Unida_Id = item.Unida_Id,
                Unida_Descripcion = item.Unida_Descripcion,
                Unida_UsuarioModificacion = 1,
                Unida_FechaModificacion = DateTime.Now,
                Unida_Estado = true

            };
            var list = _generalServices.ActualizarUnidades(modelo);
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
        public IActionResult Details(int Unida_Id)
        {
            var list = _generalServices.BuscarUnidades(Unida_Id);

            return Ok(list);
        }

        [HttpDelete("Eliminar/{Unida_Id}")]
        public IActionResult Delete(int Unida_Id)
        {
            var result = new ServiceResult();

            var list = _generalServices.EliminarUnidades(Unida_Id);
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