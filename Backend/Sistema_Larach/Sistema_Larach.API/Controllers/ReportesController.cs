using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Sistema_Larach.BusinessLogic;
using Sistema_Larach.BusinessLogic.Services;
using Sistema_Larach.Common.Models;
using Sistema_Larach.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PdfSharpCore.Drawing;
using PdfSharpCore.Pdf;
using System.Reflection.Metadata;
using System.IO;

namespace Sistema_Larach.API.Controllers
{
    [ApiController]
    [Route("/API/[controller]")]
    public class ReportesController : Controller
    {


        private readonly SupermercadoService _supermercadoService;
        private readonly IMapper _mapper;

        public ReportesController(SupermercadoService supermercadoService, IMapper mapper)
        {
            _supermercadoService = supermercadoService;
            _mapper = mapper;
        }


        [HttpGet("Listado")]

        public IActionResult Index()
        {

            var listado = _supermercadoService.ReporteCrecimiento();

            return Ok(listado);
        }







        [HttpGet("ReporteCrecimiento")]
        public IActionResult GenerarReporteCrecimiento()
        {
            try
            {
                var datos = _supermercadoService.ListadoReporte1();

                PdfDocument document = new PdfDocument();
                PdfPage page = document.AddPage();
                XGraphics gfx = XGraphics.FromPdfPage(page);

                XFont titleFont = new XFont("Arial", 18, XFontStyle.Bold);
                XFont font = new XFont("Arial", 12);

                // Título del reporte
                string titulo = "Reporte de Crecimiento";
                XSize titleSize = gfx.MeasureString(titulo, titleFont);
                gfx.DrawString(titulo, titleFont, XBrushes.Black, (page.Width - titleSize.Width) / 2, 50);

                int posX = 100;
                int posY = 100;

                // Encabezados de tabla
                gfx.DrawString("Mes", font, XBrushes.Black, posX, posY);
                gfx.DrawString("Ventas", font, XBrushes.Black, posX + 100, posY);
                gfx.DrawString("Crecimiento", font, XBrushes.Black, posX + 200, posY);
                gfx.DrawString("Porcentaje Crecimiento", font, XBrushes.Black, posX + 300, posY);
                posY += 20;

                // Datos de la tabla
                foreach (var dato in datos)
                {
                    gfx.DrawString(dato.Mes, font, XBrushes.Black, posX, posY);
                    gfx.DrawString(dato.Ventas.ToString(), font, XBrushes.Black, posX + 100, posY);
                    gfx.DrawString(dato.Crecimiento.ToString(), font, XBrushes.Black, posX + 200, posY);
                    gfx.DrawString(dato.Porcentaje_Crecimiento.ToString(), font, XBrushes.Black, posX + 300, posY);
                    posY += 20;
                }

                System.IO.MemoryStream stream = new System.IO.MemoryStream();
                document.Save(stream, false);
                stream.Position = 0;

                return File(stream, "application/pdf", "reporte_crecimiento.pdf");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al generar el reporte: {ex.Message}");
            }
        }









        [HttpGet("ReporteCrecimientoVentas")]
        public IActionResult GenerarReporteCrecimientoVentas(DateTime Venen_FechaPedido1, DateTime Venen_FechaPedido2)
        {
            try
            {
                var datos = _supermercadoService.ListadoReporteCrecimientoVentas(Venen_FechaPedido1, Venen_FechaPedido2);

                PdfDocument document = new PdfDocument();
                PdfPage page = document.AddPage();
                XGraphics gfx = XGraphics.FromPdfPage(page);

                XFont titleFont = new XFont("Arial", 18, XFontStyle.Bold);
                XFont font = new XFont("Arial", 12);

                string titulo = "Reporte de Crecimiento";
                XSize titleSize = gfx.MeasureString(titulo, titleFont);
                gfx.DrawString(titulo, titleFont, XBrushes.Black, (page.Width - titleSize.Width) / 2, 50);

                // Crear una tabla
                int tableX = 50;
                int tableY = 100;
                int cellPadding = 5;
                int columnWidth = 100;
                int rowHeight = 20;
                int tableWidth = 500;

                // Dibujar encabezados de columna
                gfx.DrawRectangle(XPens.Black, new XRect(tableX, tableY, tableWidth, rowHeight));
                XStringFormat stringFormat = new XStringFormat();
                stringFormat.Alignment = XStringAlignment.Center;
                List<string> columnHeaders = new List<string> { "Año", "Mes", "Ventas", "Crecimiento", "Porcentaje Crecimiento" };
                for (int i = 0; i < columnHeaders.Count; i++)
                {
                    XRect cellBounds = new XRect(tableX + (i * columnWidth), tableY, columnWidth, rowHeight);
                    gfx.DrawString(columnHeaders[i], font, XBrushes.Black, cellBounds, stringFormat);
                }

                tableY += rowHeight;

                // Dibujar datos de la tabla
                foreach (var dato in datos)
                {
                    gfx.DrawRectangle(XPens.Black, new XRect(tableX, tableY, tableWidth, rowHeight));
                    for (int i = 0; i < columnHeaders.Count; i++)
                    {
                        XRect cellBounds = new XRect(tableX + (i * columnWidth), tableY, columnWidth, rowHeight);
                        gfx.DrawString(GetValueForColumn(dato, i), font, XBrushes.Black, cellBounds, stringFormat);
                    }

                    tableY += rowHeight;
                }

                System.IO.MemoryStream stream = new System.IO.MemoryStream();
                document.Save(stream, false);
                stream.Position = 0;

                return File(stream, "application/pdf", "reporte_crecimiento.pdf");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al generar el reporte: {ex.Message}");
            }
        }

        private string GetValueForColumn(tbReportes dato, int columnIndex)
        {
            // Método para obtener el valor de la columna específica en función de los datos de entrada.
            // Asume que TuTipoDeDato tiene propiedades correspondientes a cada columna.
            switch (columnIndex)
            {
                case 0:
                    return dato.año.ToString();
                case 1:
                    return dato.Mes;
                case 2:
                    return dato.Ventas.ToString();
                case 3:
                    return dato.Crecimiento.ToString();
                case 4:
                    return dato.Porcentaje_Crecimiento.ToString();
                default:
                    return string.Empty;
            }
        }


        //[HttpGet("ReporteCrecimientoVentas")]
        //public IActionResult GenerarReporteCrecimientoVentas(DateTime Venen_FechaPedido1,
        //    DateTime Venen_FechaPedido2)
        //{
        //    try
        //    {
        //        var datos = _supermercadoService.ListadoReporteCrecimientoVentas(Venen_FechaPedido1, Venen_FechaPedido2);

        //        PdfDocument document = new PdfDocument();
        //        PdfPage page = document.AddPage();
        //        XGraphics gfx = XGraphics.FromPdfPage(page);

        //        XFont titleFont = new XFont("Arial", 18, XFontStyle.Bold);
        //        XFont font = new XFont("Arial", 12);

        //        string titulo = "Reporte de Crecimiento";
        //        XSize titleSize = gfx.MeasureString(titulo, titleFont);
        //        gfx.DrawString(titulo, titleFont, XBrushes.Black, (page.Width - titleSize.Width) / 2, 50);

        //        // Crear una tabla
        //        int tableX = 100;
        //        int tableY = 100;
        //        int cellPadding = 5;
        //        int columnWidth = 100;
        //        int rowHeight = 20;
        //        int tableWidth = 500;

        //        // Dibujar encabezados de columna
        //        gfx.DrawRectangle(XPens.Black, new XRect(tableX, tableY, tableWidth, rowHeight));
        //        gfx.DrawString("Año", font, XBrushes.Black, new XRect(tableX + cellPadding, tableY + cellPadding, columnWidth, rowHeight), XStringFormats.Center);
        //        gfx.DrawRectangle(XPens.Black, new XRect(tableX + columnWidth, tableY, tableWidth, rowHeight));
        //        gfx.DrawString("Mes", font, XBrushes.Black, new XRect(tableX + columnWidth + cellPadding, tableY + cellPadding, columnWidth, rowHeight), XStringFormats.Center);
        //        gfx.DrawRectangle(XPens.Black, new XRect(tableX + columnWidth * 2, tableY, tableWidth, rowHeight));
        //        gfx.DrawString("Ventas", font, XBrushes.Black, new XRect(tableX + columnWidth * 2 + cellPadding, tableY + cellPadding, columnWidth, rowHeight), XStringFormats.Center);
        //        gfx.DrawRectangle(XPens.Black, new XRect(tableX + columnWidth * 3, tableY, tableWidth, rowHeight));
        //        gfx.DrawString("Crecimiento", font, XBrushes.Black, new XRect(tableX + columnWidth * 3 + cellPadding, tableY + cellPadding, columnWidth, rowHeight), XStringFormats.Center);
        //        gfx.DrawRectangle(XPens.Black, new XRect(tableX + columnWidth * 4, tableY, tableWidth, rowHeight));
        //        gfx.DrawString("Porcentaje Crecimiento", font, XBrushes.Black, new XRect(tableX + columnWidth * 4 + cellPadding, tableY + cellPadding, columnWidth, rowHeight), XStringFormats.Center);

        //        tableY += rowHeight;

        //        // Dibujar datos de la tabla
        //        foreach (var dato in datos)
        //        {
        //            gfx.DrawRectangle(XPens.Black, new XRect(tableX, tableY, tableWidth, rowHeight));
        //            gfx.DrawString(dato.año, font, XBrushes.Black, new XRect(tableX + cellPadding, tableY + cellPadding, columnWidth, rowHeight), XStringFormats.Center);
        //            gfx.DrawRectangle(XPens.Black, new XRect(tableX + columnWidth, tableY, tableWidth, rowHeight));
        //            gfx.DrawString(dato.Mes, font, XBrushes.Black, new XRect(tableX + columnWidth + cellPadding, tableY + cellPadding, columnWidth, rowHeight), XStringFormats.Center);
        //            gfx.DrawRectangle(XPens.Black, new XRect(tableX + columnWidth * 2, tableY, tableWidth, rowHeight));
        //            gfx.DrawString(dato.Ventas.ToString(), font, XBrushes.Black, new XRect(tableX + columnWidth * 2 + cellPadding, tableY + cellPadding, columnWidth, rowHeight), XStringFormats.Center);
        //            gfx.DrawRectangle(XPens.Black, new XRect(tableX + columnWidth * 3, tableY, tableWidth, rowHeight));
        //            gfx.DrawString(dato.Crecimiento.ToString(), font, XBrushes.Black, new XRect(tableX + columnWidth * 3 + cellPadding, tableY + cellPadding, columnWidth, rowHeight), XStringFormats.Center);
        //            gfx.DrawRectangle(XPens.Black, new XRect(tableX + columnWidth * 4, tableY, tableWidth, rowHeight));
        //            gfx.DrawString(dato.Porcentaje_Crecimiento.ToString(), font, XBrushes.Black, new XRect(tableX + columnWidth * 4 + cellPadding, tableY + cellPadding, columnWidth, rowHeight), XStringFormats.Center);

        //            tableY += rowHeight;
        //        }

        //        System.IO.MemoryStream stream = new System.IO.MemoryStream();
        //        document.Save(stream, false);
        //        stream.Position = 0;

        //        return File(stream, "application/pdf", "reporte_crecimiento.pdf");
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Error al generar el reporte: {ex.Message}");
        //    }
        //}





        //[HttpGet("ReporteCrecimiento")]
        //public IActionResult GenerarReporteCrecimiento()
        //{
        //    try
        //    {
        //        var datos = _supermercadoService.ListadoReporte1();

        //        PdfDocument document = new PdfDocument();
        //        PdfPage page = document.AddPage();

        //        XGraphics gfx = XGraphics.FromPdfPage(page);

        //        XFont font = new XFont("Arial", 12);
        //        int posX = 100;
        //        int posY = 100;

        //        // Encabezados de tabla
        //        gfx.DrawString("Mes", font, XBrushes.Black, posX, posY);
        //        gfx.DrawString("Ventas", font, XBrushes.Black, posX + 100, posY);
        //        gfx.DrawString("Crecimiento", font, XBrushes.Black, posX + 200, posY);
        //        gfx.DrawString("Porcentaje_Crecimiento", font, XBrushes.Black, posX + 300, posY);
        //        posY += 20;

        //        // Datos de la tabla
        //        foreach (var dato in datos)
        //        {
        //            gfx.DrawString(dato.Mes, font, XBrushes.Black, posX, posY);
        //            gfx.DrawString(dato.Ventas.ToString(), font, XBrushes.Black, posX + 100, posY);

        //            gfx.DrawString(dato.Crecimiento.ToString(), font, XBrushes.Black, posX + 200, posY);
        //            gfx.DrawString(dato.Porcentaje_Crecimiento.ToString(), font, XBrushes.Black, posX + 300, posY);
        //            posY += 20;
        //        }

        //        System.IO.MemoryStream stream = new System.IO.MemoryStream();
        //        document.Save(stream, false);
        //        stream.Position = 0;

        //        return File(stream, "application/pdf", "reporte_crecimiento.pdf");
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Error al generar el reporte: {ex.Message}");
        //    }
        //}






        //[HttpGet("ReporteCrecimiento")]

        //public IActionResult GenerarReporteCrecimiento()
        //{
        //    try
        //    {
        //        var datos = _supermercadoService.ListadoReporte1();

        //        PdfDocument document = new PdfDocument();
        //        PdfPage page = document.AddPage();

        //        XGraphics gfx = XGraphics.FromPdfPage(page);

        //        XFont font = new XFont("Arial", 12);
        //        int posY = 100;

        //        foreach (var dato in datos)
        //        {
        //            gfx.DrawString(dato.Mes, font, XBrushes.Black, 100, posY);
        //            gfx.DrawString(dato.Ventas.ToString(), font, XBrushes.Black, 200, posY);
        //            posY += 20;
        //        }

        //        System.IO.MemoryStream stream = new System.IO.MemoryStream();
        //        document.Save(stream, false);
        //        stream.Position = 0;

        //        return File(stream, "application/pdf", "reporte_crecimiento.pdf");
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Error al generar el reporte: {ex.Message}");
        //    }
        //}

    }
}
