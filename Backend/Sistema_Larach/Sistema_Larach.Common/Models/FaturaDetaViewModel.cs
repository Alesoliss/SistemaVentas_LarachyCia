using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.Common.Models
{
    public class FaturaDetaViewModel
    {
        public string Produ_Id { get; set; }
        public int Vende_Id { get; set; }
        public string Producto { get; set; }
        public int Cantidad { get; set; }

        public int Precio_Unitario { get; set; }
        public int Total { get; set; }

    }
}
