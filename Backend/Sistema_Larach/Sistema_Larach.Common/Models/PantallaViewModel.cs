using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.Common.Models
{
  public  class PantallaViewModel
    {
        public int Panta_Id { get; set; }
        public string Panta_Descripcion { get; set; }
        public int Panta_UsuarioCreacion { get; set; }
        public DateTime Panta_FechaCreacion { get; set; }
        public int? Panta_UsuarioModificacion { get; set; }
        public DateTime? Panta_FechaModificacion { get; set; }
        public bool? Panta_Estado { get; set; }
        [NotMapped]
        public string PantallasDescripcion { get; set; }
        [NotMapped]
        public List<int> PantallasID { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioModificacion { get; set; }

        [NotMapped]
        public int numero { get; set; }

        [NotMapped]
        public int pantID { get; set; }
        [NotMapped]

        public string pantDescripcion { get; set; }
    }
}
