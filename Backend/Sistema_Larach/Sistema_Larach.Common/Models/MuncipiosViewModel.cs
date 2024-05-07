using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.Common.Models
{
   public class MuncipiosViewModel
    {
        public string Munic_Id { get; set; }
        public string Munic_Descripcion { get; set; }
        public string Depar_Id { get; set; }
        public int Munic_UsuarioCreacion { get; set; }
        public DateTime Munic_FechaCreacion { get; set; }
        public int? Munic_UsuarioModificacion { get; set; }
        public DateTime? Munic_FechaModificacion { get; set; }
       [NotMapped]
        public string Depar_Descripcion { get; set; }

        public bool? Munic_Estado { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioModificacion { get; set; }
    }
}
