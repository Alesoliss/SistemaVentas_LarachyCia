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
    public class CargoController : Controller
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;

        public CargoController(GeneralServices generalService, IMapper mapper)
        {
            _generalServices = generalService;
            _mapper = mapper;
        }

        [HttpGet("DropDown")]
        public IActionResult List()
        {
            var list = _generalServices.Listadocargos();
            var drop = list.Data as List<tbCargos>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Cargo_Descripcion,
                Value = x.Cargo_Id.ToString()
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }








        [HttpGet("Listado")]

        public IActionResult Index()
        {

            var listado = _generalServices.Listadocargos();

            return Ok(listado);
        }
        [HttpPost("Create")]
        public IActionResult Insert(CargosViewModel item)
        {
            var model = _mapper.Map<tbCargos>(item);
            var modelo = new tbCargos()
            {
                Cargo_Descripcion = item.Cargo_Descripcion,
                Cargo_UsuarioCreacion = 1,
                Cargo_FechaCreacion = DateTime.Now,
                Cargo_Estado = true

            };
            var list = _generalServices.InsertarCargo(modelo);
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
        public IActionResult Update(CargosViewModel item)
        {

            var model = _mapper.Map<tbCargos>(item);
            var modelo = new tbCargos()
            {
                Cargo_Id = item.Cargo_Id,
                Cargo_Descripcion = item.Cargo_Descripcion,
                Cargo_UsuarioModificacion = 1,
                Cargo_FechaModificacion = DateTime.Now,
                Cargo_Estado = true

            };
            var list = _generalServices.ActualizarCargo(modelo);
            if (list.Success)
            {
                return Ok(list);
            }
            else
            {
                return Problem(list.Message);
            }
        }
        [HttpGet("Detalles/{Cargo_Id}")]
        public IActionResult Details(int Cargo_Id)
        {
            var list = _generalServices.BuscarCargos(Cargo_Id);

            return Json(list.Data);
        }

        [HttpDelete("Eliminar/{Cargo_Id}")]
        public IActionResult Delete(int Cargo_Id)
        {
            var result = new ServiceResult();

            var list = _generalServices.EliminarCargo(Cargo_Id);
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