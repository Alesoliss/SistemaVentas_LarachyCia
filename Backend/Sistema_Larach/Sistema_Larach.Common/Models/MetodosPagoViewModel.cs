using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.Common.Models
{
   public class MetodosPagoViewModel
    {
        public int MtPag_Id { get; set; }
        public string MtPag_Descripcion { get; set; }
        public int MtPag_UsuarioCreacion { get; set; }
        public DateTime MtPag_FechaCreacion { get; set; }
        public int? MtPag_UsuarioModificacion { get; set; }
        public bool? MtPag_Estado { get; set; }
        public DateTime? MtPag_FechaModificacion { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioModificacion { get; set; }
    }
}
