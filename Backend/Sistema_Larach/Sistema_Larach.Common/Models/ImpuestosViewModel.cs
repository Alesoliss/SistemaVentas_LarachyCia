using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.Common.Models
{
   public class ImpuestosViewModel
    {
        public int Impue_Id { get; set; }
        public decimal Impue_Descripcion { get; set; }
        public int Impue_UsuarioCreacion { get; set; }
        public DateTime Impue_FechaCreacion { get; set; }
        public int? Impue_UsuarioModificacion { get; set; }
        public DateTime? Impue_FechaModificacion { get; set; }
        public bool? Impue_Estado { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioModificacion { get; set; }


    }
}
