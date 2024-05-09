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
    public class EmpleadosController : Controller
    {
        private readonly SupermercadoService _supermercadoService;
        private readonly IMapper _mapper;

        public EmpleadosController(SupermercadoService supermercadoService, IMapper mapper)
        {
            _supermercadoService = supermercadoService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]

        public IActionResult Index()
        {

            var listado = _supermercadoService.ListadoEmpleados();

            return Ok(listado.Data);
        }
        [HttpPost("Create")]
        public IActionResult Insert(EmpleadosViewModel item)
        {
            var model = _mapper.Map<tbEmpleados>(item);
            var modelo = new tbEmpleados()
            {
            
     Emple_DNI = item.Emple_DNI,
         Emple_PrimerNombre=   item.Emple_PrimerNombre,
                Emple_SegundoNombre=    item.Emple_SegundoNombre,
                Emple_PrimerApellido=    item.Emple_PrimerApellido,
                Emple_SegundoApellido=    item.Emple_SegundoApellido,
                Emple_Sexo=    item.Emple_Sexo,
                Estad_Id=   item.Estad_Id,
                Emple_Telefono=  item.Emple_Telefono,
                Munic_Id=     item.Munic_Id,
                Emple_Direccion=     item.Emple_Direccion,
               Emple_Correo = item.Emple_Correo,
          Cargo_Id=  item.Cargo_Id,
           Emple_UsuarioCreacion =  1,
           Emple_FechaCreacion=  DateTime.Now,
          Sucur_Id=  item.Sucur_Id

        };
            var list = _supermercadoService.InsertEmpleado(modelo);
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
        public IActionResult Update(EmpleadosViewModel item)
        {

            var model = _mapper.Map<tbEmpleados>(item);
            var modelo = new tbEmpleados()
            {
                Emple_Id = item.Emple_Id,
                Emple_DNI = item.Emple_DNI,
                Emple_PrimerNombre = item.Emple_PrimerNombre,
                Emple_SegundoNombre = item.Emple_SegundoNombre,
                Emple_PrimerApellido = item.Emple_PrimerApellido,
                Emple_SegundoApellido = item.Emple_SegundoApellido,
                Emple_Sexo = item.Emple_Sexo,
                Estad_Id = item.Estad_Id,
                Emple_Telefono = item.Emple_Telefono,
                Munic_Id = item.Munic_Id,
                Emple_Direccion = item.Emple_Direccion,
                Emple_Correo = item.Emple_Correo,
                Cargo_Id = item.Cargo_Id,
                Emple_UsuarioModificacion = 1,
                Emple_FechaModificacion = DateTime.Now,
                Sucur_Id = item.Sucur_Id


            };
            var list = _supermercadoService.UpdateEmpleado(modelo);
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
        public IActionResult Details(int Emple_Id)
        {
            var list = _supermercadoService.BuscarEmpleados(Emple_Id);

            return Ok(list);
        }

        [HttpDelete("Eliminar/{Emple_Id}")]
        public IActionResult Delete(int Emple_Id)
        {
            var result = new ServiceResult();

            var list = _supermercadoService.BuscarEmpleados(Emple_Id);
         
                return Ok(list);
        

        }

    }

    }
