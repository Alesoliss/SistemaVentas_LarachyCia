using AutoMapper;
using Sistema_Larach.BusinessLogic.Services;
using Sistema_Larach.Common.Models;
using Sistema_Larach.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sistema_Larach.API.Services;

namespace Sistema_Larach.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : Controller
    {
        private readonly AccesoService _accesoService;
      
        private readonly IMapper _mapper;

        public UsuarioController(AccesoService accesoService, IMapper mapper)
        {
            _accesoService = accesoService;
         
            _mapper = mapper;
        }

        [HttpGet("Listado")]

        public IActionResult Index()
        {

            var listado = _accesoService.Listadousuarios();

            return Ok(listado);
        }

        [HttpGet("List/Roles")]
        public IActionResult ListRol()
        {
            try
            {
                var usuarios = _accesoService.ListRol();
                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al obtener la lista de roles.");
            }
        }


        [HttpGet("List/Empleados")]
        public IActionResult ListEmpleado()
        {
            try
            {
                var usuarios = _accesoService.ListEmpleado();
                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al obtener la lista de roles.");
            }
        }


        [HttpGet("List/EstadosCiviles")]
        public IActionResult ListEstadosCiviles()
        {
            try
            {
                var usuarios = _accesoService.ListEstadosCiviles();
                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al obtener la lista de roles.");
            }
        }


        [HttpGet("List/Municipios")]
        public IActionResult ListMunicipios()
        {
            try
            {
                var usuarios = _accesoService.ListMunicipios();
                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error al obtener la lista de roles.");
            }
        }


        [HttpGet("List/ListadoPrueba")]
        public IActionResult ListadoPrueba()
        {
            var data = new
            {
                usuarios = new[]
                {
                    new { Nombre = "Usuario1", Edad = 25, Email = "usuario1@example.com" },
                    new { Nombre = "Usuario2", Edad = 30, Email = "usuario2@example.com" },
                }
            };
            return Ok(data);
        }
        [HttpGet("Login/{usuario},{contrasena}")]
        public IActionResult Login(string usuario, string contrasena)
        {
            var list = _accesoService.LoginUsuario(usuario, contrasena);

            return Ok(list.Data);
        }

        [HttpPost("Insert")]
        public IActionResult InsertUsuarios(UsuariosViewModel item)
        {
            try
            {
                var model = _mapper.Map<tbUsuarios>(item);

                var result = _accesoService.InsertUsuarios(model);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("Insert/Clientes")]
        public IActionResult InsertClientes(ClienteViewModel item)
        {
            try
            {
                var model = _mapper.Map<tbClientes>(item);

                var result = _accesoService.InsertClientes(model);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




        [HttpPut("Update")]
        public IActionResult UpdateCompraDetalle(UsuariosViewModel item)
        {
            var model = _mapper.Map<tbUsuarios>(item);
            var modelo = new tbUsuarios()
            {
                Usuar_Id = item.Usuar_Id,
                Usuar_Usuario = item.Usuar_Usuario,
                Usuar_Contrasena = item.Usuar_Contrasena,
                Perso_Id = item.Perso_Id,
                Roles_Id = item.Roles_Id,
                Usuar_Admin = item.Usuar_Admin,
                Usuar_Tipo = true,
                Usuar_UsuarioModificacion = 1,
                Usuar_FechaModificacion = DateTime.Now
            };
            var result = _accesoService.UpdateUsuarios(modelo);

            return Ok("Usuario actualizado exitosamente");

        }


        [HttpDelete("Delete/{Usuar_Id}")]
        public IActionResult DeleteCompraDetalle(int Usuar_Id)
        {
            var list = _accesoService.DeleteUsuarios(Usuar_Id);
            return Ok(list);
        }

        [HttpGet("Cargar/Usuarios")]
        public IActionResult CargarUsuarios(int Usuar_Id)
        {
            var list = _accesoService.CargarUsuarios(Usuar_Id);

            return Ok(list);
        }

        [HttpGet("Detalles/{Usuar_Id}")]
        public IActionResult Details(int Usuar_Id)
        {
            var list = _accesoService.CargarUsuarios(Usuar_Id);

            return Json(list.Data);
        }

        //[HttpGet("ValidarReestablecer/{usuario}")]
        //public IActionResult ValidarReestablecer(string usuario)
        //{

        //    Random random = new Random();
        //    int randomNumber = random.Next(100000, 1000000);
        //    var estado = _accesoService.ValidarReestablecer(usuario);
        //    var lista = estado.Data;
        //    if (lista.Count > 0)
        //    {
        //        var datos = estado.Data as List<tbUsuarios>;
        //        var first = datos.FirstOrDefault();
        //        _accesoService.ImplementarCodigo(randomNumber.ToString(), first.Usuar_Id);
        //        MailData mailData = new MailData();
        //        mailData.EmailToId = first.Emple_Correo;
        //        mailData.EmailToName = "Gestion HN";
        //        mailData.EmailSubject = "Codigo de Reestablecimiento de Contraseña";
        //        mailData.EmailBody = "Su codigo es:" + randomNumber.ToString();
        //        _mailService.SendMail(mailData);
        //    }
        //    return Ok(estado);

        //}


    }
}