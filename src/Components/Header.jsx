import React from 'react'
import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';

const Header = ({user}) => {
const {user: authenticatedUser, setIsAuthenticated, cerrarSesion} = useAuth();

  return (
    <nav className="navbar bg-primary" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Admin</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Estadisticas</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Administracion</a>
        </li>
          <li className="nav-item">
          <a className="nav-link" href="#">Usuarios</a>
        </li>
        <div>
            <span><i className="fa-solid fa-circle-user" ></i> {authenticatedUser || "Usuario"} </span>
            <hr />
            <button className="btn btn-danger" onClick={() => cerrarSesion()}>Cerrar Sesión</button>
        </div>
       
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Header