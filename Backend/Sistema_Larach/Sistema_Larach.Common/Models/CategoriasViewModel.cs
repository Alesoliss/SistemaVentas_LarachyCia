using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.Common.Models
{
    public class CategoriasViewModel
    {

        public int Categ_Id { get; set; }
        public string Categ_Descripcion { get; set; }
        public string Cate_ImagenUrl { get; set; }

        public int Categ_UsuarioCreacion { get; set; }
        public DateTime Categ_FechaCreacion { get; set; }
        public int? Categ_UsuarioModificacion { get; set; }
        public DateTime? Categ_FechaModificacion { get; set; }
        public bool? Categ_Estado { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioModificacion { get; set; }

    }
}
