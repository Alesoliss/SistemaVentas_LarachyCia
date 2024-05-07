using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.Common.Models
{
  public class EmpleadosViewModel
    {
        public int Emple_Id { get; set; }
        public string Emple_DNI { get; set; }
        public string Emple_PrimerNombre { get; set; }
        public string Emple_SegundoNombre { get; set; }
        public string Emple_PrimerApellido { get; set; }
        public string Emple_SegundoApellido { get; set; }
        public string Emple_Sexo { get; set; }
        public int Estad_Id { get; set; }
        public string Emple_Telefono { get; set; }
        public string Emple_Correo { get; set; }
        public string Emple_Direccion { get; set; }
        public string Munic_Id { get; set; }
        public int Cargo_Id { get; set; }
        public int Emple_UsuarioCreacion { get; set; }
        public DateTime Emple_FechaCreacion { get; set; }
        public int? Emple_UsuarioModificacion { get; set; }
        public DateTime? Emple_FechaModificacion { get; set; }
        public bool? Emple_Estado { get; set; }
        public int Sucur_Id { get; set; }

        [NotMapped]
        public string Munic_Descripcion { get; set; }
        [NotMapped]
        public string Sucur_Descripcion { get; set; }
        [NotMapped]
        public string Cargo_Descripcion { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioModificacion { get; set; }
    }
}
