using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.Common.Models
{
  public  class RolesViewModel
    {
        public int Roles_Id { get; set; }
        public string Roles_Descripcion { get; set; }
        public int Roles_UsuarioCreacion { get; set; }
        public DateTime Roles_FechaCreacion { get; set; }
        public int? Roles_UsuarioModificacion { get; set; }
        public DateTime? Roles_FechaModificacion { get; set; }
        public bool? Roles_Estado { get; set; }
        [NotMapped]
        public int scoop { get; set; }

        [NotMapped]
        public List<PantallaViewModel> pantallas { get; set; }

        [NotMapped]
        public List<int> PantallasID { get; set; }

        [NotMapped]
        public int Resultado { get; set; }

        [NotMapped]
        public string Nul { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioModificacion { get; set; }


        //agregar
        [NotMapped]
        public int pantID { get; set; }
        [NotMapped]
        public string pantDescripcion { get; set; }
    }
}
