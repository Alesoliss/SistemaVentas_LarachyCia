using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.Common.Models
{
  public  class EstadosCivilesViewModel
    {

        public int Estad_Id { get; set; }
        public string Estad_Descripcion { get; set; }
        public int Estad_UsuarioCreacion { get; set; }
        public DateTime Estad_FechaCreacion { get; set; }
        public int? Estad_UsuarioModificacion { get; set; }
        public DateTime? Estad_FechaModificacion { get; set; }
        public bool? Estad_Estado { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioModificacion { get; set; }
    }
}
