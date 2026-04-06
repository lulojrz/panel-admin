import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { useAuth } from '../Context/AuthContext';
import { useAdmin } from '../Context/AdminContext';
import Swal from 'sweetalert2';
import {useNavigate } from 'react-router-dom';

const Perfil = () => {
  // 1. Hooks de Contexto
  const { infoUsuario, setInfoUsuario, verificarPassword, permiso, setPermiso, editarUsuario } = useAuth();
  const { usuarios, obtenerUsuarios } = useAdmin();
  const Navigate = useNavigate();

  // 2. Estados locales para el formulario de password
  const [oldPassword, setOldPassword] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');

  // 3. Estado del objeto usuario para edición
  const [usuarioActual, setUsuarioActual] = useState({
    id: '', nombre: '', apellido: '', email: '', usuario: '', rol: ''
  });

  // 4. Efectos para carga de datos y persistencia (F5)
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  useEffect(() => {
    const cargarDatos = async () => {
      // Solo pedimos la lista si está vacía
      if (usuarios.length === 0) {
        await obtenerUsuarios();
      }

      const localUser = localStorage.getItem('user');
      if (localUser) {
        const encontrado = usuarios.find(u => u.usuario === localUser);
        if (encontrado && (!infoUsuario || infoUsuario.usuario !== encontrado.usuario)) {
          setInfoUsuario(encontrado);
          setUsuarioActual(encontrado);
        }
      }
    };

    cargarDatos();
  }, [usuarios.length]); 

 
const handleGuardarCambios = async (e) => {
    e.preventDefault();
   
    if (!usuarioActual.nombre || !usuarioActual.email) {
        Swal.fire("Error", "Los datos del usuario no se han cargado correctamente.", "warning");
        return;
    }
    if (permiso && pass1 !== pass2) {
        Swal.fire("Error", "Las nuevas contraseñas no coinciden.", "error");
        return;
    }

   

    const passwordAEnviar = permiso ? pass1 : null;

    const bodyParaEnviar = {
        ...usuarioActual,
        password: passwordAEnviar 
    };

    await  editarUsuario(infoUsuario.id, bodyParaEnviar);
    setTimeout(() => {
      Navigate(0);
    }, 3000);
    
};
  // 6. El RETURN debe estar SIEMPRE dentro de las llaves de 'Perfil'
  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-sm border-0">

              <div className="card-header bg-primary text-white text-center py-4" style={{ borderRadius: '0.5rem 0.5rem 0 0' }}>
                <div className="rounded-circle bg-white d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '80px', height: '80px' }}>
                  <i className="fa-solid fa-user text-primary fs-1"></i>
                </div>
                <h3 className="mb-0 text-capitalize">
                  {infoUsuario?.nombre || 'Cargando...'} {infoUsuario?.apellido || ''}
                </h3>
                <span className="badge rounded-pill bg-light text-primary mt-2">
                  {infoUsuario?.rol || 'Usuario'}
                </span>
              </div>

              <div className="card-body p-4">
                <h5 className="card-title mb-4 border-bottom pb-2">Información de la Cuenta</h5>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label className="text-muted small fw-bold text-uppercase">Usuario</label>
                    <p className="mb-0">@{infoUsuario?.usuario}</p>
                  </div>
                  <div className="col-sm-6">
                    <label className="text-muted small fw-bold text-uppercase">Email</label>
                    <p className="mb-0 text-break">{infoUsuario?.email}</p>
                  </div>
                  <div className="col-12 border-top pt-2">
                    <label className="text-muted small fw-bold text-uppercase">Contraseña</label>
                    <p className="mb-0 text-muted">••••••••••••</p>
                  </div>
                </div>
              </div>

              <div className="card-footer bg-transparent p-4 text-center">
                <button className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#changePasswordModal">
                  <i className="bi bi-pencil-square me-2"></i>Editar Perfil / Seguridad
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE EDICIÓN */}
      <div className="modal fade" id="changePasswordModal" tabIndex="-1">
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleGuardarCambios}>
            <div className="modal-header">
              <h5 className="modal-title">Editar Mi Perfil</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">



              <h6 className="text-danger"><i className="bi bi-shield-lock me-2"></i>Seguridad</h6>
              <p className="small text-muted">Verifica tu clave actual para habilitar el cambio de contraseña.</p>

              <div className="input-group mb-2">
                <input type="password" password="old" className="form-control" placeholder="Contraseña actual"
                  onChange={(e) => setOldPassword(e.target.value)} />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                 
                  onClick={() => {
                    if (infoUsuario && infoUsuario.id) {
                      verificarPassword(infoUsuario.id, oldPassword);
                    } else {
                      Swal.fire("Error", "No se encontró el ID del usuario. Intenta recargar.", "warning");
                    }
                  }}
                >
                  Verificar
                </button>
              </div>

              {permiso && (
                <div className="bg-light p-3 rounded mt-3 border">
                  <label className="form-label small fw-bold">Nueva Contraseña</label>
                  <input type="password" title="new1" className="form-control mb-2" placeholder="Escribe la nueva clave"
                    onChange={(e) => setPass1(e.target.value)} />
                  <input type="password" title="new2" className="form-control" placeholder="Confirma la nueva clave"
                    onChange={(e) => setPass2(e.target.value)} />
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary w-100 shadow-sm" data-bs-dismiss="modal">Guardar Todos los Cambios</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};


export default Perfil;