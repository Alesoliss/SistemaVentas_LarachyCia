using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Sistema_Larach.BusinessLogic;
using Sistema_Larach.BusinessLogic.Services;
using Sistema_Larach.Common.Models;
using Sistema_Larach.DataAccess.Repository;
using Sistema_Larach.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sistema_Larach.API.Controllers
{
    [ApiController]
    [Route("/API/[controller]")]
    public class RolController : Controller
    {
        private readonly AccesoService _accesoService;
        private readonly IMapper _mapper;

        public RolController(AccesoService accesoService, IMapper mapper)
        {
            _accesoService = accesoService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]

        public IActionResult Index()
        {

            var listado = _accesoService.ListadoRoles();

            return Ok(listado.Data);
        }







        [HttpPost("Create")]

        public IActionResult Insert(FormData formData)
        {


            var msj = new ServiceResult();
            string txtRol = formData.txtRol;
            List<int> pantallasSeleccionadas = formData.pantallasSeleccionadas;

            var modelo = new tbRoles()
            {
                Roles_Descripcion = txtRol,
                Roles_UsuarioCreacion = 1,
                Roles_FechaCreacion = DateTime.Now
            };
            var list = _accesoService.InsertarRol(modelo);


            int idRol = Int32.Parse(list);

            foreach (var pantalla in pantallasSeleccionadas)
            {
                var modelo2 = new tbPantallasPorRoles()
                {
                    Panta_Id = pantalla,
                    Roles_Id = idRol,
                };

                msj = _accesoService.InsertarRolesPantalla(modelo2);

            }


            return Ok(new { success = true, message = msj.Message });
        }





        [HttpGet("Fill/{id}")]
        public IActionResult Llenar(int id)
        {
            var list = _accesoService.obterRolesPantalla(id);
            if (list.Success)
            {
                return Ok(list.Data);
            }
            else
            {
                return BadRequest(list.Message);
            }
        }


        [HttpGet("FillDetalles/{id}")]
        public IActionResult FillDetalles(int id)
        {
            var list = _accesoService.ObtenerRoles(id);
            if (list.Success)
            {
                return Ok(list.Data);
            }
            else
            {
                return BadRequest(list.Message);
            }
        }




        [HttpPut("Edit")]
        public IActionResult Update(FormData formData)
        {

            var msj = new ServiceResult();
            List<int> pantallasSeleccionadas = formData.pantallasSeleccionadas;


            var modelo = new tbRoles()
            {
                Roles_Id = formData.Rol_Id,
                Roles_Descripcion = formData.txtRol,
                Roles_UsuarioModificacion = 1,
                Roles_FechaModificacion = DateTime.Now

            };
            var list = _accesoService.EditarRol(modelo);

            var idRol = formData.Rol_Id;

            var res = _accesoService.EliminarRolesPantalla(idRol.ToString());

            foreach (var pantalla in pantallasSeleccionadas)
            {
                var modelo2 = new tbPantallasPorRoles()
                {
                    Panta_Id = pantalla,
                    Roles_Id = idRol,
                };

                msj = _accesoService.InsertarRolesPantalla(modelo2);

            }


            return Ok(new { success = true, message = msj.Message });

        }








        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(string id)
        {
            var list = _accesoService.EliminarRolesPantalla(id);
            var list2 = _accesoService.EliminarRol(id);

            return Ok(new { success = true, message = list2.Message });
        }





    }
}
