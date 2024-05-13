using AHM.Total.Travel.DataAccess.Repositories;
using Microsoft.Data.SqlClient;
using Sistema_Larach.Common.Models;
using Sistema_Larach.DataAccess.Repository;
using Sistema_Larach.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sistema_Larach.BusinessLogic.Services
{
    public class AccesoService
    {
        private readonly UsuariosRepository _usuariosRepository;
        private readonly ClientesRepository _clientesRepository;
        private readonly RolesRepository _rolesRepository;

        private readonly PantallasPorRolesRepository _pantallasPorRolesRepository;


        public AccesoService(UsuariosRepository usuariosRepository, ClientesRepository
            clientesRepository, RolesRepository rolesRepository, PantallasPorRolesRepository pantallasPorRolesRepository)
        {
            _usuariosRepository = usuariosRepository;
            _clientesRepository = clientesRepository;
            _rolesRepository = rolesRepository;
            _pantallasPorRolesRepository = pantallasPorRolesRepository;

        }

        #region Usuarios
        public ServiceResult Listadousuarios()
        {
            var result = new ServiceResult();
            try
            {
                var list = _usuariosRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }



        public IEnumerable<UsuariosViewModel> ListRol()
        {
            try
            {
                var usuarios = _usuariosRepository.ListRol();
                return usuarios;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"errorrr: {ex.Message}");

                throw;
            }
        }


        public IEnumerable<UsuariosViewModel> ListEmpleado()
        {
            try
            {
                var usuarios = _usuariosRepository.LisEmpleado();
                return usuarios;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"errorrr: {ex.Message}");

                throw;
            }
        }
        public ServiceResult LoginUsuario(string usuario, string contraseña)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuariosRepository.Login(usuario, contraseña);

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public IEnumerable<ClienteViewModel> ListEstadosCiviles()
        {
            try
            {
                var usuarios = _clientesRepository.ListEstadosCiviles();
                return usuarios;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"errorrr: {ex.Message}");

                throw;
            }
        }


        public IEnumerable<ClienteViewModel> ListMunicipios()
        {
            try
            {
                var usuarios = _clientesRepository.ListMunicipios();
                return usuarios;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"errorrr: {ex.Message}");

                throw;
            }
        }


        public ServiceResult InsertUsuarios(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuariosRepository.Insert(item);
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



        public ServiceResult InsertClientes(tbClientes item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _clientesRepository.Insert(item);
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

        public ServiceResult UpdateUsuarios(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuariosRepository.Update(item);
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


        public ServiceResult DeleteUsuarios(int Usuar_Id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuariosRepository.Delete(Usuar_Id);
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

        public ServiceResult CargarUsuarios(int Usuar_Id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuariosRepository.find(Usuar_Id);

                return result.Ok(lost);

            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult DetallesUsuarios(int Usuar_Id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuariosRepository.Details(Usuar_Id);

                return result.Ok(lost);

            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ValidarReestablecer(string usuario)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuariosRepository.ValidarReestablecer(usuario);

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult MostrarCodigo(string codigo)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuariosRepository.SiExisteCodigo(codigo);

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ImplementarCodigo(string codigo, int id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuariosRepository.InsertarCodigo(codigo, id);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }


            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion



        #region roles
        public ServiceResult ListadoRoles()
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolesRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }






        public string InsertarRol(tbRoles item)
        {
            string error = "";
            try
            {
                int result = _rolesRepository.Insertar(item);
                if (result == 0)
                    error = "el codigo no es valido";
                else error = result.ToString();
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return error;
        }






        public ServiceResult EliminarRol(string Role_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolesRepository.Delete(Role_Id);
                if (list.CodeStatus > 0)
                {
                    return result.Ok($"La accion ha sido existosa", list);
                }
                else
                {
                    return result.Error("No se pudo realizar la accion");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }






        public ServiceResult ListadoPantallaRoles()
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallasPorRolesRepository.List();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }






        public ServiceResult EditarRol(tbRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolesRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok("okis", list);
                }
                else
                {
                    return result.Error("Y existe un registro con ese nombre");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }



        public ServiceResult InsertarRolesPantalla(tbPantallasPorRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallasPorRolesRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }




        public ServiceResult EditarRolesPantalla(tbPantallasPorRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallasPorRolesRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok("okis", list);
                }
                else
                {
                    return result.Error("Y existe un registro con ese nombre");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }
        public ServiceResult EliminarRolesPantalla(string Roles_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallasPorRolesRepository.Delete(Roles_Id);
                if (list.CodeStatus > 0)
                {
                    return result.Ok($"La accion ha sido existosa", list);
                }
                else
                {
                    return result.Error("No se pudo realizar la accion");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }








        public ServiceResult obterRolesPantalla(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallasPorRolesRepository.Fill(id);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }


        public ServiceResult ObtenerRoles(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallasPorRolesRepository.Fill2(id);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }







        #endregion








    }
}