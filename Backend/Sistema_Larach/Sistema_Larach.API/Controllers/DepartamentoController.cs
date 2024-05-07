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
    public class DepartamentoController : Controller
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;

        public DepartamentoController(GeneralServices generalService, IMapper mapper)
        {
            _generalServices = generalService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]

        public IActionResult Index()
        {

            var listado = _generalServices.ListadoDepto1();

            return Ok(listado);
        }


        [HttpPost("Create")]
        public IActionResult Insert(DepartamentosViewModel item)
        {
            var model = _mapper.Map<tbDepartamentos>(item);
            var modelo = new tbDepartamentos()
            {
                Depar_Id = item.Depar_Id,
                Depar_Descripcion = item.Depar_Descripcion,
                Depar_UsuarioCreacion = 1,
                Depar_FechaCreacion = DateTime.Now,
                Depar_Estado = true

            };
            var list = _generalServices.InsertarDepto(modelo);
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
        public IActionResult Update(DepartamentosViewModel item)
        {

            var model = _mapper.Map<tbDepartamentos>(item);
            var modelo = new tbDepartamentos()
            {
                Depar_Id = item.Depar_Id,
                Depar_Descripcion = item.Depar_Descripcion,



            };
            var list = _generalServices.ActualizarDepto(modelo);
            if (list.Success)
            {
                return Ok(list);
            }
            else
            {
                return Problem(list.Message);
            }
        }

        [HttpGet("LlenarDepartamentos/{Depa_Codigo}")]
        public IActionResult LlenarDeptos(string Depa_Codigo)
        {
            string error;
            var llenar = _generalServices.BuscarDepto(Depa_Codigo).ToList();
            //HttpContext.Session.SetString("Depa_id", Depa_Codigo);
            var id = llenar.FirstOrDefault()?.Depar_Id;
            var descripcion = llenar.FirstOrDefault()?.Depar_Descripcion;
            return Json(new { success = true, id, descripcion });
        }

        [HttpDelete("Eliminar/{Depa_Codigo}")]
        public IActionResult Delete(string Depa_Codigo)
        {
            var result = new ServiceResult();

            var list = _generalServices.EliminarDepartamento(Depa_Codigo);
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
        public IActionResult Details(string Depa_Codigo)
        {
            var list = _generalServices.BuscarDepto1(Depa_Codigo);

            return Ok(list);
        }
    }
}