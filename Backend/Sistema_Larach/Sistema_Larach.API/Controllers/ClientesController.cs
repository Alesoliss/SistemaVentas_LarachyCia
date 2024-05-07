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

            return Ok(listado);
        }
    }
}