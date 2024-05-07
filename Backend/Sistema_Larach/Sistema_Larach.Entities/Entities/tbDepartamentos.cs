﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Sistema_Larach.Entities
{
    public partial class tbDepartamentos
    {
        public tbDepartamentos()
        {
            tbMunicipios = new HashSet<tbMunicipios>();
        }

        public string Depar_Id { get; set; }
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
        public virtual tbUsuarios Depar_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios Depar_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbMunicipios> tbMunicipios { get; set; }
    }
}