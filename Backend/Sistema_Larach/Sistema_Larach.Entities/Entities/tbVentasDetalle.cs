﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Sistema_Larach.Entities
{
    public partial class tbVentasDetalle
    {
        [NotMapped]
        public int ClienteIdNuevo { get; set; }
        [NotMapped]
        public int EmpleadoIdNuevo { get; set; }
        [NotMapped]

        public int Emple_Id { get; set; }
        [NotMapped]
        public string empleado { get; set; }
        public int Vende_Id { get; set; }
        public int Venen_Id { get; set; }
        public int Produ_Id { get; set; }
        public int Vende_Cantidad { get; set; }
        public int Vende_UsuarioCreacion { get; set; }
        public DateTime Vende_FechaCreacion { get; set; }
        public int? Vende_UsuarioModificacion { get; set; }
        public DateTime? Vende_FechaModificacion { get; set; }
        public bool? Vende_Estado { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioModificacion { get; set; }
        public virtual tbProductos Produ { get; set; }
        public virtual tbUsuarios Vende_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios Vende_UsuarioModificacionNavigation { get; set; }
        public virtual tbVentasEncabezado Venen { get; set; }
    }
}