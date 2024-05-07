using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.Common.Models
{
   public class SucursalesViewModel
    {
        public int Sucur_Id { get; set; }
        public string Sucur_Descripcion { get; set; }
        public string Munic_Id { get; set; }
        public string Sucur_Direccion { get; set; }
        public string Sucur_Telefono { get; set; }
        public int Sucur_UsuarioCreacion { get; set; }
        public DateTime Sucur_FechaCreacion { get; set; }
        public int? Sucur_UsuarioModificacion { get; set; }
        public DateTime? Sucur_FechaModificacion { get; set; }
        public bool? Sucur_Estado { get; set; }
        [NotMapped]
        public string Munic_Descripcion { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioModificacion { get; set; }
    }
}
