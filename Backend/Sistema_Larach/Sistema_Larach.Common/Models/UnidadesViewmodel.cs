using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.Common.Models
{
   public class UnidadesViewmodel
    {
        public int Unida_Id { get; set; }
        public string Unida_Descripcion { get; set; }
        public int Unida_UsuarioCreacion { get; set; }
        public DateTime Unida_FechaCreacion { get; set; }
        public int? Unida_UsuarioModificacion { get; set; }
        public DateTime? Unida_FechaModificacion { get; set; }
        public bool? Unida_Estado { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioModificacion { get; set; }
    }
}
