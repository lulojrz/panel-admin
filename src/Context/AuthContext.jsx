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


    const cerrarSesion = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('rol');
        navigate('/');
    }



    const obtenerInformacionUsuario = async (usuario) => {
        try {
            const response = await fetch(`http://localhost:8080/api/find/usuarios?usuario=${usuario}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data_usuarios = await response.json();
            setInfoUsuario(data_usuarios);
            
            if (response.ok) {
                setRol(data_usuarios.rol);
                localStorage.setItem('rol', data_usuarios.rol);
                
            } else {
                setError("Error al obtener el rol");
                Swal.fire
                    ({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al obtener el rol'
                    });
            }

  
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
                headers: {'Content-Type': 'application/json'
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
        }}


         

    return (
        <AuthContext.Provider value={{ user, setUser, password, setPassword, handleSubmit, setIsAuthenticated, isAuthenticated, cerrarSesion , rol, setRol, obtenerInformacionUsuario, infoUsuario }}>
            {children}
        </AuthContext.Provider>
    )

}


export const useAuth = () => useContext(AuthContext);
           