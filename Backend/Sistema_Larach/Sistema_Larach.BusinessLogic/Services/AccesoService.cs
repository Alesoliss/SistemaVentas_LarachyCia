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




        public AccesoService(UsuariosRepository usuariosRepository, ClientesRepository
            clientesRepository, RolesRepository rolesRepository)
        {
            _usuariosRepository = usuariosRepository;
            _clientesRepository = clientesRepository;
            _rolesRepository = rolesRepository;

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

        #endregion

    }
}