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
    const [email,setEmail] = useState("");


    const cerrarSesion = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('rol');
        localStorage.removeItem('infoUsuario');
        localStorage.removeItem('isAuth');
        navigate('/');
    }


    const encontrarUsuario = async (usuario) => {
        try {
            const response = await fetch(`\${import.meta.env.VITE_API_URL}/api/find/usuarios`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario: usuario })
            });
            const data_usuarios = await response.json();
            setEmail(data_usuarios.email);
            setUser(data_usuarios.usuario);
        } catch (error) {
            console.error("Error al encontrar el usuario:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al encontrar el usuario'
            });
        }
    }


    const crearUsuario= async (usuarioNuevo) => {
      try{
        const response = await fetch(`\${import.meta.env.VITE_API_URL}/api/registro`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' , 'Authorization': "Bearer " + localStorage.getItem('token')},
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
            const response = await fetch(`\${import.meta.env.VITE_API_URL}/api/find/usuarios`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario: usuario })
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
            const response = await fetch(`\${import.meta.env.VITE_API_URL}/api/verificacion/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + localStorage.getItem('token') },
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
            const url = `\${import.meta.env.VITE_API_URL}/api/editar/usuario/${id}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('token')
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Perfil actualizado',
                    text: 'El perfil se ha actualizado correctamente.'
                });
                return true;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo actualizar el perfil.'
                });
                return false;
            }
        }
        catch (error) {
            console.error("Error en la petición:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor.'
            });
            return false;
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
            const response = await fetch(`\${import.meta.env.VITE_API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario: user, password: password })

            })
            const data = await response.json();
            localStorage.setItem ("rol", data.rol);
           


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
            localStorage.setItem("token", data.token);
            
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
            const response = await fetch (`\${import.meta.env.VITE_API_URL}/api/eliminar/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('token')
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
        <AuthContext.Provider value={{ user, setUser, password, setPassword, handleSubmit, setIsAuthenticated, isAuthenticated, cerrarSesion, rol, setRol, obtenerInformacionUsuario, infoUsuario, setInfoUsuario, verificarPassword, permiso, setPermiso, password1, setPassword1, password2, setPassword2, editarUsuario, crearUsuario, eliminarUsuario, encontrarUsuario, email, setEmail }}>
            {children}
        </AuthContext.Provider>
    )

}


export const useAuth = () => useContext(AuthContext);
