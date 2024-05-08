using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.Common.Models
{
    public class GraficosViewModel
    {
        public int Cantidades { get; set; }
        public double Total { get; set; }
        public char Genero { get; set; }
        public int Ano { get; set; }
        public int Mes { get; set; }
        public string Categoria { get; set; }
        [NotMapped]
        public int Year { get; set; }
        [NotMapped]
        public int Month { get; set; }
        [NotMapped]
        public int TotalVendido { get; set; }
        [NotMapped]

        public string NombreProducto { get; set; }
        [NotMapped]

        public string Cantidad { get; set; }
        [NotMapped]

        public string Producto { get; set; }

        [NotMapped]

        public string TotalVentas { get; set; }
    }
}
