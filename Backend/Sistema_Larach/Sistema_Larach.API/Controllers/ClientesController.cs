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
    public class ClientesController : Controller
    {
        private readonly SupermercadoService _supermercadoService;
        private readonly IMapper _mapper;

        public ClientesController(SupermercadoService supermercadoService, IMapper mapper)
        {
            _supermercadoService = supermercadoService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]

        public IActionResult Index()
        {

            var listado = _supermercadoService.ListadoClientes();

            return Ok(listado.Data);
        }

        [HttpPost("Create")]
        public IActionResult Insert(ClienteViewModel item)
        {
            var model = _mapper.Map<tbClientes>(item);
            var modelo = new tbClientes()
            {

                Clien_PrimerNombre = item.Clien_PrimerNombre,
                Clien_SegundoNombre = item.Clien_SegundoNombre,
                Clien_PrimerApellido = item.Clien_PrimerApellido,
                Clien_SegundoApellido = item.Clien_SegundoApellido,
                Clien_Sexo = item.Clien_Sexo,
                Estad_Id = item.Estad_Id,
                Clien_Telefono = item.Clien_Telefono,
                Clien_Correo = item.Clien_Sexo,
                Munic_Id = item.Munic_Id,
                Clien_Direccion = item.Clien_Direccion,
                Clien_UsuarioModificacion = 1,
                Clien_FechaModificacion = DateTime.Now,

            };
            var list = _supermercadoService.InsertCliente(modelo);
            return Ok(new { success = true, message = list.Message });
        }

        [HttpPut("Actualizar")]
        public IActionResult Update(ClienteViewModel item)
        {

            var model = _mapper.Map<tbClientes>(item);
            var modelo = new tbClientes()
            {
              Clien_Id = item.Clien_Id,
              Clien_PrimerNombre = item.Clien_PrimerNombre,
              Clien_SegundoNombre = item.Clien_SegundoNombre,
              Clien_PrimerApellido = item.Clien_PrimerApellido,
              Clien_SegundoApellido = item.Clien_SegundoApellido,
              Clien_Sexo = item.Clien_Sexo,
              Estad_Id = item.Estad_Id,
              Clien_Telefono = item.Clien_Telefono,
              Clien_Correo = item.Clien_Sexo,
              Munic_Id = item.Munic_Id,
              Clien_Direccion = item.Clien_Direccion,
                Clien_UsuarioModificacion = 1,
                Clien_FechaModificacion = DateTime.Now,
        


            };
            var list = _supermercadoService.UpdateCliente(modelo);
            return Ok(new { success = true, message = list.Message });
        }
        [HttpGet("Detalles/{Clien_Id}")]
        public IActionResult Details(int Clien_Id)
        {
            var list = _supermercadoService.obterCliente(Clien_Id);

            return Json(list.Data);
        }

        [HttpDelete("Eliminar/{Clien_Id}")]
        public IActionResult Delete(int Clien_Id)
        {
            var result = new ServiceResult();

            var list = _supermercadoService.DeleteCliente(Clien_Id);

            return Ok(list);


        }
    }
}