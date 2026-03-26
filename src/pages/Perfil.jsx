import React from 'react'
import Header from '../Components/Header'
import { useAuth } from '../Context/AuthContext';

const Perfil = () => {
    const {user,rol, infoUsuario} = useAuth();
    console.log(user,rol,infoUsuario);


  return (
    <>
    <Header></Header>
    <div>Perfil</div>
    </>
  )
}

export default Perfil