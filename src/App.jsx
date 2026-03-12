
import './App.css'
import Login from './pages/Login'
import { Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import { useContext } from 'react';
import {  useAuth } from './Context/AuthContext';
import Administracion from './pages/Administracion';
import AgregarProducto from './pages/AgregarProducto';
import AgregarVariantes from './pages/AgregarVariantes';



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

      

    </Routes>

    
    </>
  )
}

export default App
