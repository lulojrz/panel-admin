
import './App.css'
import Login from './pages/Login'
import { Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import { useContext } from 'react';
import {  useAuth } from './Context/AuthContext';
import Administracion from './pages/Administracion';
import AgregarProducto from './pages/AgregarProducto';
import AgregarVariantes from './pages/AgregarVariantes';
import Usuarios from './pages/Usuarios';
import CambioContraseña from './pages/CambioContraseña';
import CrearUsuario from './pages/CrearUsuario';
import Perfil from './pages/Perfil';


function App() {
  const {user} = useAuth();


  return (
    <>

    <Routes>
      <Route path='/' element={<Login></Login>}/>
      <Route path='/home' element={<Home user={user}></Home>}/>
      <Route path='/administracion' element={<Administracion user={user}></Administracion>}/>
      <Route path='/nuevos' element={<AgregarProducto user={user}/>}/>
      <Route path='/variantes' element={<AgregarVariantes user={user}/>}/>
      <Route path ="/usuarios" element={<Usuarios user={user}/>}/>
      <Route path='/cambio-contraseña' element={<CambioContraseña user={user}/>}/>
      <Route path='/crear-usuario' element={<CrearUsuario user={user}/>}/>
      <Route path='/perfil' element={<Perfil user={user}/>}/>

      

    </Routes>

    
    </>
  )
}

export default App
