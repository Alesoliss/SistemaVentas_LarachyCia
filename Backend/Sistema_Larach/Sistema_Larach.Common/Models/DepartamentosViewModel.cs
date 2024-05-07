using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Sistema_Larach.Common.Models
{
   public class DepartamentosViewModel
    {
        [Display(Name = "Codigo")]

        public string Depar_Id { get; set; }
        [Display(Name = "Departamento")]

        public string Depar_Descripcion { get; set; }
        public int Depar_UsuarioCreacion { get; set; }
        public DateTime Depar_FechaCreacion { get; set; }
        public int? Depar_UsuarioModificacion { get; set; }
        public DateTime? Depar_FechaModificacion { get; set; }
        public bool? Depar_Estado { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioModificacion { get; set; }
    }
}
