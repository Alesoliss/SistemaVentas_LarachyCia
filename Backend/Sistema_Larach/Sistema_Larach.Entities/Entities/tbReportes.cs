using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Sistema_Larach.Entities
{
   public class tbReportes
    {
        public string Mes { get; set; }
        public string año { get; set; }

        public double Ventas { get; set; }
        public double Crecimiento { get; set; }
        public double Porcentaje_Crecimiento { get; set; }
    }
}
