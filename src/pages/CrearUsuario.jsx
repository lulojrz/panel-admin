import React, { useState } from 'react'
import Header from '../Components/Header'
import { useAuth } from '../Context/AuthContext';

const CrearUsuario = () => {
    const [usuarioNuevo, setUsuarioNuevo] = useState({
        usuario: "",
        password: "",
        nombre: "",
        apellido: "",
        email: "",
        rol: "user"

    })
    const handleCrearUsuario = async (e) => {
        e.preventDefault();
        console.log("Datos del nuevo usuario:", usuarioNuevo);

    }
    const handleUsuario = (e) => {
        const { name, value } = e.target;

        setUsuarioNuevo(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <div>
            <Header />
            <div className="container mt-4">
                <h2>Crear Usuario</h2>
                <form onSubmit={handleCrearUsuario}>
                    <div className="form-group">
                        <label htmlFor="usuario">Usuario</label>
                        <input name='usuario' type="text" className="form-control" id="usuario" placeholder="Ingrese el nombre de usuario" onChange={handleUsuario} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input name='password' type="text" className="form-control" id="password" placeholder="Ingrese la contraseña" onChange={handleUsuario} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input name='nombre' type="text" className="form-control" id="nombre" placeholder="Ingrese el nombre" onChange={handleUsuario} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido">Apellido</label>
                        <input name='apellido' type="text" className="form-control" id="apellido" placeholder="Ingrese el apellido" onChange={handleUsuario} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input name='email' type="email" className="form-control" id="email" placeholder="Ingrese el email" onChange={handleUsuario} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="rol">Rol</label>
                        <select
                            name="rol"
                            className="form-control"
                            id="rol"
                            value={usuarioNuevo.rol} 
                            onChange={handleUsuario}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Crear Usuario</button>
                </form>
            </div>
        </div>
    )
}

export default CrearUsuario