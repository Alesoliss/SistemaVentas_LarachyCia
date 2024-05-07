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

    }
}
