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
    public class SucursalesController : Controller
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;

        public SucursalesController(GeneralServices generalService, IMapper mapper)
        {
            _generalServices = generalService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]

        public IActionResult Index()
        {

            var listado = _generalServices.Listadosucursales();

            return Ok(listado);
        }

        [HttpGet("DropDown")]
        public IActionResult List()
        {
            var list = _generalServices.Listadosucursales();
            var drop = list.Data as List<tbSucursales>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Sucur_Descripcion,
                Value = x.Sucur_Id.ToString()
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }
        [HttpPost("Create")]
        public IActionResult Insert(SucursalesViewModel item)
        {
            var model = _mapper.Map<tbSucursales>(item);
            var modelo = new tbSucursales()
            {
                Sucur_Descripcion = item.Sucur_Descripcion,
                Sucur_Telefono = item.Sucur_Telefono,
                Munic_Id = item.Munic_Id,
                Sucur_Direccion = item.Sucur_Direccion,
                Sucur_UsuarioModificacion = 1,
                Sucur_FechaModificacion = DateTime.Now

            };
            var list = _generalServices.Insertarsucusal(modelo);
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
        public IActionResult Update(SucursalesViewModel item)
        {

            var model = _mapper.Map<tbSucursales>(item);
            var modelo = new tbSucursales()
            {
                Sucur_Id = item.Sucur_Id,
                Sucur_Descripcion = item.Sucur_Descripcion,
                Sucur_Telefono = item.Sucur_Telefono,
                Munic_Id = item.Munic_Id,
                Sucur_Direccion = item.Sucur_Direccion,
                Sucur_UsuarioModificacion = 1,
                Sucur_FechaModificacion = DateTime.Now

            };
            var list = _generalServices.Actualizarsucursal(modelo);
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
            var list = _generalServices.Buscarsucursal(Categ_Id);

            return Ok(list);
        }

        [HttpDelete("Eliminar/{Cargo_Id}")]
        public IActionResult Delete(int Cargo_Id)
        {
            var result = new ServiceResult();

            var list = _generalServices.Eliminarsucursal(Cargo_Id);
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
