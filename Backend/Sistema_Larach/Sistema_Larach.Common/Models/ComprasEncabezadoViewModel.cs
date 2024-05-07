using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.Common.Models
{
   public class ComprasEncabezadoViewModel
    {
        public int Comen_Id { get; set; }
        public int Prove_Id { get; set; }
        public int Sucur_Id { get; set; }
        public int Emple_Id { get; set; }
        public DateTime Comen_FechaFactura { get; set; }
        public int Comen_UsuarioCreacion { get; set; }
        public DateTime Comen_FechaCreacion { get; set; }
        public int? Comen_UsuarioModificacion { get; set; }
        public DateTime? Comen_FechaModificacion { get; set; }
        public bool? Comen_Estado { get; set; }
        [NotMapped]
        public string Prove_Marca { get; set; }
        [NotMapped]
        public string Sucur_Descripcion { get; set; }
        [NotMapped]
        public string Emple_NombreCompleto { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioModificacion { get; set; }
    }
}
