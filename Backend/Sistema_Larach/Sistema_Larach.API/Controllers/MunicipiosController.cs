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
