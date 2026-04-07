import React, { createContext, use, useContext, useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from "react-toastify";


const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [infoUsuario, setInfoUsuario] = useState({});
    const [rol, setRol] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [permiso, setPermiso] = useState(false);
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");


    const cerrarSesion = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('rol');
        localStorage.removeItem('infoUsuario');
        localStorage.removeItem('isAuth');
        navigate('/');
    }

    const crearUsuario= async (usuarioNuevo) => {
      try{
        const response = await fetch("http://localhost:8080/api/registro",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuarioNuevo)
            }
        )
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Usuario creado',
                text: 'El usuario ha sido creado exitosamente.'
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo crear el usuario.'
            });
        }

      }
        catch(error){
            console.error("Error en la creación de usuario:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor.'
            });
        }
    }





    const obtenerInformacionUsuario = async (usuario) => {
        try {
            const response = await fetch(`http://localhost:8080/api/find/usuarios?usuario=${usuario}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data_usuarios = await response.json();
            setInfoUsuario(data_usuarios);



            setRol(data_usuarios.rol);
            localStorage.setItem('rol', data_usuarios.rol);



        } catch (error) {
            setError("Error al obtener el rol");
            Swal.fire
                ({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al obtener el rol'
                });
        }




    }


    const verificarPassword = async (id, passwordInput) => {
       

        if (!id) return;

        try {
            const response = await fetch(`http://localhost:8080/api/verificacion/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: passwordInput })
            });
       
            const resultado = await response.text();

            if (resultado === "exito") {
                Swal.fire({
                    icon: 'success',
                    title: 'Contraseña verificada',
                    text: 'La contraseña es correcta. Ahora puedes cambiarla.'
                });
                setPermiso(true); 
            } else {
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'La contraseña actual es incorrecta.'
                });
                setPermiso(false);
            }




        }
        catch (error) {
            console.error("Error en la verificación de contraseña:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error en la verificación de contraseña'
            });
        }



    }

    const editarUsuario = async (id, body) => {
        console.log(body);

        try {
            const url = `http://localhost:8080/api/editar/usuario/${id}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Contraseña actualizada',
                    text: 'La contraseña ha sido actualizada correctamente.'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo actualizar la contraseña.'
                });
            }


        }
        catch (error) {
            console.error("Error en la petición:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor.'
            });
        }



    }




    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !password) {
            setError("Los campos son obligatorios");
            Swal.fire
                ({
                    icon: 'error',
                    title: 'Error',
                    text: 'Los campos son obligatorios'
                })


            return;
        }





        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario: user, password: password })
            })


            if (!response.ok) {
                setError("Error en la autenticación");
                Swal.fire
                    ({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error en la autenticación'
                    })
                return;


            }

            setIsAuthenticated(true);
            localStorage.setItem('user', user);
            localStorage.setItem('isAuthenticated', 'true');

            navigate('/home');


        }
        catch (error) {
            setError("Error en la autenticación");
            Swal.fire
                ({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error en la autenticación'
                })
            alert(error)
            return;
        }
    }


    const eliminarUsuario = async (id) => {
        try {
            const response = await fetch (`http://localhost:8080/api/eliminar/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario eliminado',
                    text: 'El usuario ha sido eliminado correctamente.'
                });

                setTimeout(() => {
                   navigate(0);  
                }, 2000);
               
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo eliminar el usuario.'
                });
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor.'
            });
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, password, setPassword, handleSubmit, setIsAuthenticated, isAuthenticated, cerrarSesion, rol, setRol, obtenerInformacionUsuario, infoUsuario, setInfoUsuario, verificarPassword, permiso, setPermiso, password1, setPassword1, password2, setPassword2, editarUsuario, crearUsuario, eliminarUsuario }}>
            {children}
        </AuthContext.Provider>
    )

}


export const useAuth = () => useContext(AuthContext);
