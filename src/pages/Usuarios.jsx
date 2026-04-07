import React, { useEffect } from 'react'
import Header from '../Components/Header'
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import { useAdmin } from '../Context/AdminContext';



const Usuarios = () => {

  const { infoUsuario, setUser, setInfoUsuario, eliminarUsuario } = useAuth();
  const { usuarios, obtenerUsuarios } = useAdmin();


  useEffect(() => {
    obtenerUsuarios();
    setUser(localStorage.getItem('user'));
  }, []);

  useEffect(() => {
    const usernameLocal = localStorage.getItem('user');
    if (usuarios.length > 0 && usernameLocal) {
      const encontrado = usuarios.find(u => u.usuario === usernameLocal);
      setInfoUsuario(encontrado);
    }
  }, [usuarios]);







  return (
    <>
      <Header></Header>
      <div className="d-flex justify-content-between align-items-center mt-4">
        {localStorage.getItem('rol') === 'admin' && (
          <Link to="/crear-usuario" className="btn btn-primary">Agregar Usuario</Link>
        )
        }
        <Link to="/perfil" className="btn btn-outline-primary">Mi Perfil</Link>
      </div>
      <table className="table" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th scope="col">Usuario</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">rol</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>

          {usuarios.map((user) => {
            const esUsuarioActual = user.usuario === localStorage.getItem('user');

            return (
              <tr
                key={user.id}
                className={esUsuarioActual ? "table-info table-active" : ""}
                style={esUsuarioActual ? { fontWeight: 'bold', borderLeft: '5px solid #0d6efd' } : {}}
              >
                <td>{user.usuario} {esUsuarioActual && <span className="badge bg-primary ms-2">Tú</span>}</td>
                <td>{user.nombre}</td>
                <td>{user.apellido}</td>
                <td>{user.rol}</td>
                <td>
                  {
                    localStorage.getItem('rol') === 'admin' ? (
                      <>
                        <button key={user.id} data-bs-toggle="modal" data-bs-target={`#eliminarModal-${user.id}`} className="btn btn-danger btn-sm" disabled={esUsuarioActual} >
                          Eliminar</button>

                        <div className="modal fade" id={`eliminarModal-${user.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                ¿Esta seguro que desea eliminar al siguiente usuario? <br />
                                Usuario: {user.usuario} <br />
                                Nombre: {user.nombre} <br />
                                Apellido: {user.apellido} <br />
                                Rol: {user.rol}
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-danger" onClick={() => eliminarUsuario(user.id)}>Eliminar</button>
                              </div>
                            </div>
                          </div>
                        </div>

                      </>

                    ) : "No tienes permisos"
                  }

                </td>
              </tr>
            );
          })}


        </tbody>
      </table>

    </>
  )
}

export default Usuarios