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
    public class CategoriaController : Controller
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;

        public CategoriaController(GeneralServices generalService, IMapper mapper)
        {
            _generalServices = generalService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]

        public IActionResult Index()
        {

            var listado = _generalServices.Listadocategorias();

            return Ok(listado);
        }

        [HttpPost("Create")]
        public IActionResult Insert(CategoriasViewModel item)
        {
            var model = _mapper.Map<tbCategorias>(item);
            var modelo = new tbCategorias()
            {
                Categ_Descripcion = item.Categ_Descripcion,
                Cate_ImagenUrl = item.Cate_ImagenUrl,
                Categ_UsuarioCreacion = 1,
                Categ_FechaCreacion = DateTime.Now,
                Categ_Estado = true

            };
            var list = _generalServices.InsertarCate(modelo);
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
        public IActionResult Update(CategoriasViewModel item)
        {

            var model = _mapper.Map<tbCategorias>(item);
            var modelo = new tbCategorias()
            {
                Categ_Id = item.Categ_Id,
                Categ_Descripcion = item.Categ_Descripcion,
                Cate_ImagenUrl = item.Cate_ImagenUrl,
                Categ_UsuarioModificacion = 1,
                Categ_FechaModificacion = DateTime.Now,
                Categ_Estado = true

            };
            var list = _generalServices.ActualizarCate(modelo);
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
            var list = _generalServices.BuscarCargo(Categ_Id);

            return Ok(list);
        }

        [HttpDelete("Eliminar/{Categ_Id}")]
        public IActionResult Delete(int Categ_Id)
        {
            var result = new ServiceResult();

            var list = _generalServices.EliminarCate(Categ_Id);
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