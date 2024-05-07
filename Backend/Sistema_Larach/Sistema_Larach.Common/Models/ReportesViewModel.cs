using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.Common.Models
{
    public class ReportesViewModel
    {
        //Venta.SP_Ventas_Reporte_Crecimiento
        public string Mes { get; set; }
        public string año { get; set; }

        public double Ventas { get; set; }
        public double Crecimiento { get; set; }
        public double Porcentaje_Crecimiento { get; set; }

    }
}
