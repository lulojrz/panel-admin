import React, { createContext, useContext, useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from "react-toastify";


const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);




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


    return (
        <AuthContext.Provider value={{ user, setUser, password, setPassword, handleSubmit }}>
            {children}
        </AuthContext.Provider>
    )

}


export const useAuth = () => useContext(AuthContext);