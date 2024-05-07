using Sistema_Larach.DataAccess.Repository;
using Sistema_Larach.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.BusinessLogic.Services
{
    public class GeneralServices
    {
        private readonly DepartamentosRepository _departamentosRepository;
        private readonly CargosRepository _cargosRepository;
        private readonly EmpleadosRepository _empleadosRepository;
        private readonly EstadosCivilesRepository _estadosCivilesRepository;
        private readonly MunicipiosRepository _municipiosRepository;
        private readonly SucursalesRepository _sucursalesRepository;
        private readonly CategoriasRepository _categoriasRepository;
        private readonly ImpuestosRepository _impuestosRepository;
        private readonly MetodosPagoRepository _metodosPagoRepository;
        private readonly ProveedoresRepository _proveedoresRepository;
        private readonly UnidadesRepository _unidadesRepository;





        public GeneralServices(DepartamentosRepository departamentosRepository,
            CargosRepository cargosRepository, EmpleadosRepository empleadosRepository,
            EstadosCivilesRepository estadosCivilesRepository, MunicipiosRepository
            municipiosRepository, SucursalesRepository sucursalesRepository,
            CategoriasRepository categoriasRepository, ImpuestosRepository impuestosRepository,
            MetodosPagoRepository metodosPagoRepository, ProveedoresRepository proveedoresRepository,
            UnidadesRepository unidadesRepository)
        {
            _departamentosRepository = departamentosRepository;
            _cargosRepository = cargosRepository;
            _empleadosRepository = empleadosRepository;
            _empleadosRepository = empleadosRepository;
            _municipiosRepository = municipiosRepository;
            _sucursalesRepository = sucursalesRepository;
            _estadosCivilesRepository = estadosCivilesRepository;
            _categoriasRepository = categoriasRepository;
            _impuestosRepository = impuestosRepository;
            _metodosPagoRepository = metodosPagoRepository;
            _proveedoresRepository = proveedoresRepository;
            _unidadesRepository = unidadesRepository;


        }



        #region Departamento

        public ServiceResult ListadoDepto1()
        {
            var result = new ServiceResult();
            try
            {
                var list = _departamentosRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult InsertarDepto(tbDepartamentos item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _departamentosRepository.Insert(item);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ddlDeptos()
        {
            var result = new ServiceResult();
            try
            {
                var depa = _departamentosRepository.ObtenerDeptos();
                return result.Ok(depa);
            }
            catch (Exception ex)
            {
                return new ServiceResult().Error(ex.Message);
            }
        }

        public ServiceResult ActualizarDepto(tbDepartamentos item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _departamentosRepository.Update(item);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);

            }
        }

        public ServiceResult BuscarDepto1(string codigo)
        {
            var result = new ServiceResult();
            try
            {
                var list = _departamentosRepository.FindDepto(codigo);
                return result.Ok(list);

            }
            catch (Exception ex)
            {
                return result.Error(ex);

            }
        }

        public IEnumerable<tbDepartamentos> BuscarDepto(string codigo)
        {

            try
            {
                return _departamentosRepository.FindDepto(codigo);

            }
            catch
            {
                return Enumerable.Empty<tbDepartamentos>();
            }
        }

        public ServiceResult EliminarDepartamento(string id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _departamentosRepository.EliminarDepartamento(id);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion







        #region cargos
        public ServiceResult Listadocargos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _cargosRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult InsertarCargo(tbCargos item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _cargosRepository.Insert(item);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult EliminarCargo(int id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _cargosRepository.Eliminarcargo(id);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult ActualizarCargo(tbCargos item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _cargosRepository.Update(item);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);

            }
        }
        public IEnumerable<tbCargos> BuscarCargos(int codigo)
        {

            try
            {
                return _cargosRepository.Findcargo(codigo);

            }
            catch
            {
                return Enumerable.Empty<tbCargos>();
            }
        }


        #endregion




        #region categorias
        public ServiceResult Listadocategorias()
        {
            var result = new ServiceResult();
            try
            {
                var list = _categoriasRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult InsertarCate(tbCategorias item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _categoriasRepository.Insert(item);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult EliminarCate(int id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _categoriasRepository.Eliminarcategoria(id);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult ActualizarCate(tbCategorias item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _categoriasRepository.Update(item);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);

            }
        }
        public IEnumerable<tbCategorias> BuscarCargo(int codigo)
        {

            try
            {
                return _categoriasRepository.FindCategoria(codigo);

            }
            catch
            {
                return Enumerable.Empty<tbCategorias>();
            }
        }

        #endregion




        #region estadosciviles
        public ServiceResult Listadoestado()
        {
            var result = new ServiceResult();
            try
            {
                var list = _estadosCivilesRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult Insertarcivil(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _estadosCivilesRepository.Insert(item);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult Eliminarcivil(int id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _estadosCivilesRepository.EliminarEstadoCivil(id);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult Actualizarcivil(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _estadosCivilesRepository.Update(item);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);

            }
        }
        public IEnumerable<tbEstadosCiviles> Buscarcivil(int codigo)
        {

            try
            {
                return _estadosCivilesRepository.FindEstado(codigo);

            }
            catch
            {
                return Enumerable.Empty<tbEstadosCiviles>();
            }
        }

        #endregion



        #region impuestos
        public ServiceResult Listadoimpuestos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _impuestosRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult InsertarImpuesto(tbImpuestos item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _impuestosRepository.Insert(item);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult EliminarImpuesto(int id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _impuestosRepository.EliminarImpuesto(id);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult ActualizarImpuesto(tbImpuestos item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _impuestosRepository.Update(item);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);

            }
        }
        public IEnumerable<tbImpuestos> BuscarImpuesto(int codigo)
        {

            try
            {
                return _impuestosRepository.FindImpuesto(codigo);

            }
            catch
            {
                return Enumerable.Empty<tbImpuestos>();
            }
        }
        #endregion




        #region MeotdosPago
        public ServiceResult Listadometodos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _metodosPagoRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult InsertarMetodo(tbMetodospago item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _metodosPagoRepository.Insert(item);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult EliminarMetodo(int id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _metodosPagoRepository.EliminarMetodoPago(id);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult ActualizarMetodo(tbMetodospago item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _metodosPagoRepository.Update(item);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);

            }
        }
        public IEnumerable<tbMetodospago> BuscarMEtodo(int codigo)
        {

            try
            {
                return _metodosPagoRepository.FindMetodoPago(codigo);

            }
            catch
            {
                return Enumerable.Empty<tbMetodospago>();
            }
        }

        #endregion




        #region municipiso






        #region Municipio


        public ServiceResult Listadounicipios()
        {
            var result = new ServiceResult();
            try
            {
                var list = _municipiosRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }



        public ServiceResult InsertarMunicipio(tbMunicipios item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _municipiosRepository.Insert(item);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ddlMunicipios()
        {
            var result = new ServiceResult();
            try
            {
                var depa = _municipiosRepository.ObtenerMunicipios();
                return result.Ok(depa);
            }
            catch (Exception ex)
            {
                return new ServiceResult().Error(ex.Message);
            }
        }

        public ServiceResult ActualizarMunic(tbMunicipios item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _municipiosRepository.Update(item);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);

            }
        }

        public ServiceResult BuscarMunicipio1(string codigo)
        {
            var result = new ServiceResult();
            try
            {
                var list = _municipiosRepository.FindMunicipio(codigo);
                return result.Ok(list);

            }
            catch (Exception ex)
            {
                return result.Error(ex);

            }
        }

        public IEnumerable<tbMunicipios> BuscarMuic(string codigo)
        {

            try
            {
                return _municipiosRepository.FindMunicipio(codigo);

            }
            catch
            {
                return Enumerable.Empty<tbMunicipios>();
            }
        }

        public ServiceResult EliminarMunicipio(string id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _municipiosRepository.EliminarMunicipio(id);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion
        #endregion



        #region proveedores
        public ServiceResult ListaoProveedores()
        {
            var result = new ServiceResult();
            try
            {
                var list = _proveedoresRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion



        #region Sucursales
        public ServiceResult Listadosucursales()
        {
            var result = new ServiceResult();
            try
            {
                var list = _sucursalesRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion




        #region unidades
        public ServiceResult ListadoUnidades()
        {
            var result = new ServiceResult();
            try
            {
                var list = _unidadesRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarUnidades(tbUnidades item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _unidadesRepository.Insert(item);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult EliminarUnidades(int id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _unidadesRepository.EliminarUnidades(id);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult ActualizarUnidades(tbUnidades item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _unidadesRepository.Update(item);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);

            }
        }
        public IEnumerable<tbUnidades> BuscarUnidades(int codigo)
        {

            try
            {
                return _unidadesRepository.FindUnidad(codigo);

            }
            catch
            {
                return Enumerable.Empty<tbUnidades>();
            }
        }

        #endregion

        #region contra

        #endregion
    }
}