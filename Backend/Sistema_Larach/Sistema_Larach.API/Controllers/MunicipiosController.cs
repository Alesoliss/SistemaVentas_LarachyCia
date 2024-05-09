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
    public class MunicipiosController : Controller
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;

        public MunicipiosController(GeneralServices generalService, IMapper mapper)
        {
            _generalServices = generalService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]

        public IActionResult Index()
        {

            var listado = _generalServices.Listadounicipios();

            return Ok(listado);
        }
        [HttpGet("DropDown")]
        public IActionResult List()
        {
            var list = _generalServices.Listadounicipios();
            var drop = list.Data as List<tbMunicipios>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Munic_Descripcion,
                Value = x.Munic_Id
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }

        [HttpGet("Lista/{id}")]
        public IActionResult IndexPorMunicipio(string id)
        {
            var list = _generalServices.ListadoMunicipioDepartamento(id);
            var drop = list.Data as List<tbMunicipios>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Munic_Descripcion,
                Value = x.Munic_Id
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }



        [HttpPost("Create")]
        public IActionResult Insert(MuncipiosViewModel item)
        {
            var model = _mapper.Map<tbMunicipios>(item);
            var modelo = new tbMunicipios()
            {
                Munic_Id = item.Munic_Id,
                Munic_Descripcion = item.Munic_Descripcion,
                Depar_Id = item.Depar_Id

            };
            var list = _generalServices.InsertarMunicipio(modelo);
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
        public IActionResult Update(MuncipiosViewModel item)
        {

            var model = _mapper.Map<tbMunicipios>(item);
            var modelo = new tbMunicipios()
            {
                Munic_Id = item.Munic_Id,
                Munic_Descripcion = item.Munic_Descripcion,
                Depar_Id = item.Depar_Id

            };
            var list = _generalServices.ActualizarMunic(modelo);
            if (list.Success)
            {
                return Ok(list);
            }
            else
            {
                return Problem(list.Message);
            }
        }

        [HttpGet("LlenarMunicipios/{Munic_Id}")]
        public IActionResult LlenarMunic(string Munic_Id)
        {
            string error;
            var llenar = _generalServices.BuscarMuic(Munic_Id).ToList();
            var id = llenar.FirstOrDefault()?.Munic_Id;
            var descripcion = llenar.FirstOrDefault()?.Munic_Descripcion;
            return Json(new { success = true, id, descripcion });
        }

        [HttpDelete("Eliminar/{Munic_Id}")]
        public IActionResult Delete(string Munic_Id)
        {
            var result = new ServiceResult();

            var list = _generalServices.EliminarMunicipio(Munic_Id);
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
        public IActionResult Details(string Munic_Id)
        {
            var list = _generalServices.BuscarMunicipio1(Munic_Id);

            return Ok(list);
        }

    }
}
