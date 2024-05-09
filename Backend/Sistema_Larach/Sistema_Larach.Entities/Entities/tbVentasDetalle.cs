﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Sistema_Larach.Entities
{
    public partial class tbVentasDetalle
    {


        public int Vende_Id { get; set; }
        public int? Produ_Id { get; set; }
        public int? Vende_Cantidad { get; set; }
        public int? total { get; set; }
        public int? Venen_Id { get; set; }

        [NotMapped]
        public string? TotalFinal { get; set; }

        [NotMapped]
        public string? Genero { get; set; }

        [NotMapped]
        public string? TotalCompras { get; set; }

        [NotMapped]
        public string? Producto { get; set; }

        [NotMapped]
        public string? NombreProducto { get; set; }



        [NotMapped]
        public string? TotalVendido { get; set; }



        [NotMapped]
        public string? Cantidad { get; set; }

        [NotMapped]
        public string? TipoProducto { get; set; }


        [NotMapped]
        public string? PrecioVenta { get; set; }

        [NotMapped]
        public string? Mes { get; set; }

        [NotMapped]
        public string? TotalVentas { get; set; }



   













        [NotMapped]
        public int ClienteIdNuevo { get; set; }
        [NotMapped]
        public int EmpleadoIdNuevo { get; set; }
        [NotMapped]

        public int Emple_Id { get; set; }
        [NotMapped]
        public string empleado { get; set; }
 
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

        [NotMapped]
        public int Year { get; set; }
        [NotMapped]
        public int Month { get; set; }
        //[NotMapped]
        //public int TotalVendido { get; set; }
        //[NotMapped]

        //public string NombreProducto { get; set; }
        //[NotMapped]

        //public string Cantidad { get; set; }
        //[NotMapped]

        //public string Producto { get; set; }

        //[NotMapped]

        //public string TotalVentas { get; set; }

    }
}