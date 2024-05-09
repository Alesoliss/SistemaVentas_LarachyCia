using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
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
    public class EstadosCivilesController : Controller
    {

        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;

        public EstadosCivilesController(GeneralServices generalService, IMapper mapper)
        {
            _generalServices = generalService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]

        public IActionResult Index()
        {

            var listado = _generalServices.Listadoestado();

            return Ok(listado);
        }
        [HttpGet("DropDown")]
        public IActionResult List()
        {
            var list = _generalServices.Listadoestado();
            var drop = list.Data as List<tbEstadosCiviles>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Estad_Descripcion,
                Value = x.Estad_Id.ToString()
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }


        [HttpPost("Create")]
        public IActionResult Insert(EstadosCivilesViewModel item)
        {
            var model = _mapper.Map<tbEstadosCiviles>(item);
            var modelo = new tbEstadosCiviles()
            {
                Estad_Descripcion = item.Estad_Descripcion,
                Estad_UsuarioCreacion = 1,
                Estad_FechaCreacion = DateTime.Now,
                Estad_Estado = true

            };
            var list = _generalServices.Insertarcivil(modelo);
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
        public IActionResult Update(EstadosCivilesViewModel item)
        {

            var model = _mapper.Map<tbEstadosCiviles>(item);
            var modelo = new tbEstadosCiviles()
            {
                Estad_Id = item.Estad_Id,
                Estad_Descripcion = item.Estad_Descripcion,
                Estad_UsuarioModificacion = 1,
                Estad_FechaModificacion = DateTime.Now,
                Estad_Estado = true

            };
            var list = _generalServices.Actualizarcivil(modelo);
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
        public IActionResult Details(int Categ_Id)
        {
            var list = _generalServices.Buscarcivil(Categ_Id);

            return Ok(list);
        }

        [HttpDelete("Eliminar/{Cargo_Id}")]
        public IActionResult Delete(int Estad_Id)
        {
            var result = new ServiceResult();

            var list = _generalServices.Eliminarcivil(Estad_Id);
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