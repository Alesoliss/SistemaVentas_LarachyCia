using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.Common.Models
{
    public class FaturaDViewModel
    {
        public string Produ_Descripcion { get; set; }
        public int Clien_Id { get; set; }
        public int Venen_Id { get; set; }
        public int Vende_Cantidad { get; set; }

        public int MtPag_Id { get; set; }
        public int Venen_Emitida { get; set; }



    }
}
